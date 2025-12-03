<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->query('period', 'lifetime');
        $url = rtrim(env('SUPABASE_URL', ''), '/');
        $key = env('SUPABASE_SERVICE_ROLE_KEY', env('SUPABASE_ANON_KEY', ''));
        if (!$url || !$key) {
            return response()->json(['ok' => false, 'error' => 'Missing SUPABASE_URL or key'], 500);
        }

        $headers = [
            'apikey' => $key,
            'Authorization' => 'Bearer ' . $key,
        ];

        $now = now();
        $start = $now->copy()->startOfMonth()->toIso8601String();
        $end = $now->copy()->endOfMonth()->toIso8601String();

        $paramsA = [ 'select' => 'user_id,sum(points)', 'limit' => '10000' ];
        $paramsB = [ 'select' => 'user_id,sum(amount)', 'limit' => '10000' ];
        if ($period === 'month') {
            $paramsA['created_at'] = 'gte.' . $start;
            $paramsA['created_at'] .= ',lte.' . $end; // not supported; instead use multiple filters
        }

        $xpA = Http::withHeaders($headers)->get($url . '/rest/v1/xp_events', $period === 'month' ? [
            'select' => 'user_id,sum(points)', 'created_at' => 'gte.' . $start, 'created_at.lte' => $end, 'limit' => '10000'
        ] : $paramsA);
        $xpB = Http::withHeaders($headers)->get($url . '/rest/v1/user_xp_events', $period === 'month' ? [
            'select' => 'user_id,sum(amount)', 'occurred_at' => 'gte.' . $start, 'occurred_at.lte' => $end, 'limit' => '10000'
        ] : $paramsB);

        $totals = [];
        foreach (($xpA->json() ?? []) as $row) {
            $uid = (string)($row['user_id'] ?? '');
            $sum = (int)($row['sum'] ?? $row['sum_points'] ?? $row['points'] ?? 0);
            if (!$uid) continue;
            $totals[$uid] = ($totals[$uid] ?? 0) + $sum;
        }
        foreach (($xpB->json() ?? []) as $row) {
            $uid = (string)($row['user_id'] ?? '');
            $sum = (int)($row['sum'] ?? $row['sum_amount'] ?? $row['amount'] ?? 0);
            if (!$uid) continue;
            $totals[$uid] = ($totals[$uid] ?? 0) + $sum;
        }

        // Fallback lifetime from dashboard_user_stats
        if (empty($totals)) {
            $life = Http::withHeaders($headers)->get($url . '/rest/v1/dashboard_user_stats', [
                'select' => 'user_id,total_points', 'order' => 'total_points.desc', 'limit' => '100'
            ])->json();
            foreach ($life ?? [] as $row) {
                $uid = (string)($row['user_id'] ?? '');
                $totals[$uid] = (int)($row['total_points'] ?? 0);
            }
        }

        // Status
        $statuses = Http::withHeaders($headers)->get($url . '/rest/v1/leaderboard_status', [
            'select' => 'user_id,status', 'limit' => '10000'
        ])->json() ?? [];
        $statusMap = [];
        foreach ($statuses as $s) { $statusMap[(string)($s['user_id'] ?? '')] = (string)($s['status'] ?? ''); }

        // Fetch usernames from Laravel users table
        $userIds = array_map('intval', array_keys($totals));
        $names = DB::table('users')->whereIn('id', $userIds)->pluck('name', 'id');

        $rows = [];
        foreach ($totals as $uid => $total) {
            $idInt = (int)$uid;
            $rows[] = [
                'user_id' => (string)$uid,
                'name' => (string)($names[$idInt] ?? substr((string)$uid, 0, 6)),
                'totalExp' => (int)$total,
                'status' => $statusMap[(string)$uid] ?? null,
            ];
        }
        usort($rows, fn($a,$b) => $b['totalExp'] <=> $a['totalExp']);

        return response()->json(['ok' => true, 'data' => $rows]);
    }

    public function storeStatus(Request $request)
    {
        \Log::info('storeStatus called');
        $user = $request->user();
        \Log::info('User: ' . ($user ? $user->id : 'none'));
        if (!$user) {
            return response()->json(['ok' => false, 'error' => 'Unauthorized'], 401);
        }
        $status = (string)($request->input('status') ?? '');
        \Log::info('Status input: ' . $status);
        if ($status === '') {
            return response()->json(['ok' => false, 'error' => 'Missing status'], 422);
        }

        $url = rtrim(env('SUPABASE_URL', ''), '/');
        $key = env('SUPABASE_SERVICE_ROLE_KEY', env('SUPABASE_ANON_KEY', ''));
        if (!$url || !$key) {
            return response()->json(['ok' => false, 'error' => 'Missing SUPABASE env'], 500);
        }
        $headers = [
            'apikey' => $key,
            'Authorization' => 'Bearer ' . $key,
            'Content-Type' => 'application/json',
            'Prefer' => 'resolution=merge-duplicates',
        ];

        $payload = [
            'user_id' => (int)$user->id,
            'status' => $status,
            'updated_at' => now()->toIso8601String(),
        ];
        \Log::info('Payload: ' . json_encode($payload));
        
        $resp = Http::withHeaders($headers)->post($url . '/rest/v1/leaderboard_status', $payload);
        
        \Log::info('Supabase response status: ' . $resp->status());
        \Log::info('Supabase response body: ' . $resp->body());

        if (!$resp->successful()) {
            return response()->json(['ok' => false, 'error' => 'Supabase update failed', 'detail' => $resp->json()], 500);
        }
        return response()->json(['ok' => true]);
    }
}
