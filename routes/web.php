<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return Inertia::render('landing/index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('missions', function () {
        return Inertia::render('missions/index');
    })->name('missions');

    Route::get('mentoring', function () {
        return Inertia::render('mentoring/index');
    })->name('mentoring');


    Route::get('profile', function () {
        $user = request()->user();

        $ach = collect();
        $pending = collect();
        if ($user) {
            $ach = DB::table('user_achievements')
                ->join('achievements', 'user_achievements.achievement_id', '=', 'achievements.id')
                ->where('user_achievements.user_id', $user->id)
                ->select([
                    'achievements.title as title',
                    'achievements.description as description',
                    'achievements.goal as total',
                    'achievements.gradient as gradient',
                    'user_achievements.progress as progress',
                    'user_achievements.status as status',
                ])
                ->orderBy('achievements.title')
                ->get()
                ->map(function ($row) {
                    return [
                        'title' => (string) $row->title,
                        'description' => (string) ($row->description ?? ''),
                        'progress' => (int) ($row->progress ?? 0),
                        'total' => (int) ($row->total ?? 0),
                        'gradient' => (string) ($row->gradient ?? 'from-purple-400 to-fuchsia-500'),
                        'status' => (string) ($row->status ?? 'in_progress'),
                    ];
                });

            $pending = DB::table('friends')
                ->join('users', 'friends.requester_id', '=', 'users.id')
                ->leftJoin('user_profiles', 'user_profiles.user_id', '=', 'users.id')
                ->where('friends.recipient_id', $user->id)
                ->where('friends.status', 'pending')
                ->orderByDesc('friends.created_at')
                ->select([
                    'friends.id as id',
                    'users.id as requester_id',
                    'users.name as requester_name',
                    'users.email as requester_email',
                    'user_profiles.avatar_url as requester_avatar',
                ])
                ->get()
                ->map(function ($row) {
                    return [
                        'id' => (int) $row->id,
                        'requester' => [
                            'id' => (int) $row->requester_id,
                            'name' => (string) $row->requester_name,
                            'email' => (string) $row->requester_email,
                            'avatar' => $row->requester_avatar,
                        ],
                    ];
                });
        }

        return Inertia::render('profile/index', [
            'achievements' => $ach,
            'friendRequests' => $pending,
        ]);
    })->name('profile');

    Route::get('shop', function () {
        return Inertia::render('shop/index');
    })->name('shop');

    Route::get('leaderboard', function () {
        return Inertia::render('leaderboard/index');
    })->name('leaderboard');
    Route::get('api/leaderboard', [\App\Http\Controllers\LeaderboardController::class, 'index'])->name('api.leaderboard');
    Route::post('api/leaderboard/status', [\App\Http\Controllers\LeaderboardController::class, 'storeStatus'])->name('api.leaderboard.status');
    
    Route::get('journal', function () {
        return Inertia::render('journal/index');
    })->name('journal');
    
    // Mood tracker endpoints
    Route::get('moods', [\App\Http\Controllers\MoodController::class, 'index'])->name('moods.index');
    Route::post('moods', [\App\Http\Controllers\MoodController::class, 'store'])->name('moods.store');

    Route::get('friends/pending', [\App\Http\Controllers\FriendController::class, 'index'])->name('friends.pending');
    Route::post('friends', [\App\Http\Controllers\FriendController::class, 'store'])->name('friends.store');
    Route::patch('friends/{id}/accept', [\App\Http\Controllers\FriendController::class, 'accept'])->name('friends.accept');
    Route::patch('friends/{id}/reject', [\App\Http\Controllers\FriendController::class, 'reject'])->name('friends.reject');
    Route::get('mental-health-chat', function () {
        return Inertia::render('mental-health-chat/index');
    })->name('mental-health-chat');
    
    // Mental Health Chat API route
    Route::post('/api/mental-health-chat', [App\Http\Controllers\MentalHealthChatController::class, 'chat'])
        ->name('api.mental-health-chat');

    Route::get('mentoring/level/{id}', function ($id) {
        $allowed = [1, 2, 3];
        if (!in_array((int)$id, $allowed, true)) {
            abort(404);
        }
        return Inertia::render('mentoring/levels/level-' . $id);
    })->name('mentoring.level.show');

    Route::post('invites', [\App\Http\Controllers\InviteController::class, 'store'])->name('invites.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
