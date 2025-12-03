<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class InviteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $email = $request->input('email');
        $userId = Auth::id();

        $url = rtrim(env('SUPABASE_URL', ''), '/');
        // Fallback: jika lingkungan menyimpan service role key di nama lain (mis. SUPABASE_ANON_KEY), gunakan nilai tersebut.
        $serviceKey = env('SUPABASE_SERVICE_ROLE_KEY', env('SUPABASE_ANON_KEY', ''));

        if (!$url || !$serviceKey) {
            return response()->json(['ok' => false, 'error' => 'not_configured'], 503);
        }

        $inviteRes = Http::withHeaders([
            'apikey' => $serviceKey,
            'Authorization' => 'Bearer ' . $serviceKey,
            'Content-Type' => 'application/json',
        ])->post($url . '/auth/v1/admin/invite', [
            'email' => $email,
            'data' => ['invited_by' => $userId],
            'redirect_to' => url('/login'),
        ]);

        $status = $inviteRes->successful() ? 'sent' : 'failed';

        try {
            Http::withHeaders([
                'apikey' => $serviceKey,
                'Authorization' => 'Bearer ' . $serviceKey,
                'Content-Type' => 'application/json',
                'Prefer' => 'return=representation',
            ])->post($url . '/rest/v1/invites', [
                'inviter_user_id' => $userId,
                'email' => $email,
                'status' => $status,
                'created_at' => now()->toIso8601String(),
            ]);
        } catch (\Throwable $e) {
        }

        if (!$inviteRes->successful()) {
            $code = $inviteRes->status();
            $payload = $inviteRes->json();
            return response()->json([
                'ok' => false,
                'status' => $status,
                'error' => $payload,
                'hint' => ($code === 401 || $code === 403) ? 'Pastikan nilai env yang digunakan adalah Service Role Key, meskipun nama variabel berbeda.' : null,
            ], 500);
        }

        return response()->json(['ok' => true, 'status' => $status]);
    }
}
