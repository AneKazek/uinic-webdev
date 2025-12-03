<?php

namespace App\Http\Controllers;

use App\Models\MoodLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MoodController extends Controller
{
    /**
     * Return mood logs and the current streak for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $logs = MoodLog::query()
            ->where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->get(['date', 'mood', 'label']);

        // Compute streak ending today: consecutive days with entries
        $today = Carbon::today();
        $dates = $logs->pluck('date')->map(fn($d) => Carbon::parse($d)->toDateString())->flip();
        $streak = 0;
        $cursor = $today->copy();
        while ($dates->has($cursor->toDateString())) {
            $streak++;
            $cursor->subDay();
        }

        return response()->json([
            'data' => $logs->map(fn($log) => [
                'date' => Carbon::parse($log->date)->toDateString(),
                'mood' => $log->mood,
                'label' => $log->label,
            ]),
            'streak' => $streak,
        ]);
    }

    /**
     * Store or update today's mood for the authenticated user.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'mood' => ['required', 'string', 'max:32'],
            'label' => ['nullable', 'string', 'max:64'],
            'date' => ['nullable', 'date'],
        ]);

        $date = isset($validated['date']) ? Carbon::parse($validated['date'])->toDateString() : Carbon::today()->toDateString();

        $log = MoodLog::query()
            ->updateOrCreate(
                ['user_id' => $user->id, 'date' => $date],
                ['mood' => $validated['mood'], 'label' => $validated['label'] ?? null]
            );

        // Recompute streak quickly
        $logs = MoodLog::query()
            ->where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->get(['date']);

        $today = Carbon::today();
        $dates = $logs->pluck('date')->map(fn($d) => Carbon::parse($d)->toDateString())->flip();
        $streak = 0;
        $cursor = $today->copy();
        while ($dates->has($cursor->toDateString())) {
            $streak++;
            $cursor->subDay();
        }

        return response()->json([
            'saved' => true,
            'streak' => $streak,
            'date' => $date,
        ]);
    }
}