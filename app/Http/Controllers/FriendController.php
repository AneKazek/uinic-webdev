<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $rows = Friend::query()
            ->where('recipient_id', $user->id)
            ->where('status', 'pending')
            ->orderByDesc('created_at')
            ->get();

        $data = $rows->map(function (Friend $f) {
            $u = $f->requester()->first();
            $profile = $u ? \DB::table('user_profiles')->where('user_id', $u->id)->first() : null;
            return [
                'id' => $f->id,
                'requester' => [
                    'id' => $u?->id,
                    'name' => $u?->name,
                    'email' => $u?->email,
                    'avatar' => $profile?->avatar_url ?? null,
                ],
                'status' => $f->status,
            ];
        });

        return response()->json(['data' => $data]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'recipient_email' => ['nullable', 'email'],
            'recipient_id' => ['nullable', 'integer'],
            'recipient_name' => ['nullable', 'string', 'max:255'],
        ]);

        $recipient = null;
        if (!empty($validated['recipient_id'])) {
            $recipient = User::query()->find($validated['recipient_id']);
        } elseif (!empty($validated['recipient_email'])) {
            $recipient = User::query()->where('email', $validated['recipient_email'])->first();
        } elseif (!empty($validated['recipient_name'])) {
            $name = trim($validated['recipient_name']);
            if ($name !== '') {
                $recipient = User::query()
                    ->whereRaw('LOWER(name) = ?', [strtolower($name)])
                    ->first();
                if (!$recipient) {
                    $recipient = User::query()
                        ->where('name', 'like', $name)
                        ->first();
                }
            }
        }

        if (!$recipient) {
            return response()->json(['error' => 'recipient_not_found'], 404);
        }
        if ($recipient->id === $user->id) {
            return response()->json(['error' => 'cannot_add_self'], 422);
        }

        $existing = Friend::query()
            ->where(function ($q) use ($user, $recipient) {
                $q->where('requester_id', $user->id)->where('recipient_id', $recipient->id);
            })
            ->orWhere(function ($q) use ($user, $recipient) {
                $q->where('requester_id', $recipient->id)->where('recipient_id', $user->id);
            })
            ->first();

        if ($existing) {
            if ($existing->status === 'pending') {
                return response()->json(['saved' => false, 'reason' => 'already_pending'], 200);
            }
            if ($existing->status === 'accepted') {
                return response()->json(['saved' => false, 'reason' => 'already_friends'], 200);
            }
        }

        $row = Friend::create([
            'requester_id' => $user->id,
            'recipient_id' => $recipient->id,
            'status' => 'pending',
        ]);

        return response()->json(['saved' => true, 'id' => $row->id]);
    }

    public function accept(Request $request, int $id)
    {
        $user = Auth::user();
        $row = Friend::query()->where('id', $id)->where('recipient_id', $user->id)->first();
        if (!$row) {
            return response()->json(['error' => 'not_found'], 404);
        }
        $row->status = 'accepted';
        $row->save();
        return response()->json(['updated' => true]);
    }

    public function reject(Request $request, int $id)
    {
        $user = Auth::user();
        $row = Friend::query()->where('id', $id)->where('recipient_id', $user->id)->first();
        if (!$row) {
            return response()->json(['error' => 'not_found'], 404);
        }
        $row->status = 'rejected';
        $row->save();
        return response()->json(['updated' => true]);
    }
}