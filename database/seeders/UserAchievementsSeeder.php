<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class UserAchievementsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return;
        }

        $slugs = [
            'wildfire',
            'sage',
            'champion',
            'mindful-master',
            'gratitude-guardian',
        ];

        $achievements = DB::table('achievements')
            ->whereIn('slug', $slugs)
            ->get()
            ->keyBy('slug');

        foreach ($users as $user) {
            $rows = [];

            $rows[] = self::buildRow($user->id, $achievements, 'wildfire', 260);
            $rows[] = self::buildRow($user->id, $achievements, 'sage', 7944);
            $rows[] = self::buildRow($user->id, $achievements, 'champion', 0);
            $rows[] = self::buildRow($user->id, $achievements, 'mindful-master', 12);
            $rows[] = self::buildRow($user->id, $achievements, 'gratitude-guardian', 10);

            $rows = array_filter($rows); // remove nulls if achievement missing

            if (!empty($rows)) {
                DB::table('user_achievements')->upsert(
                    $rows,
                    ['user_id', 'achievement_id']
                );
            }
        }
    }

    private static function buildRow(int $userId, $achievements, string $slug, int $progress): ?array
    {
        $a = $achievements[$slug] ?? null;
        if (!$a) return null;
        $unlocked = $progress >= (int)($a->goal ?? 0) ? now() : null;
        return [
            'user_id' => $userId,
            'achievement_id' => $a->id,
            'progress' => $progress,
            'unlocked_at' => $unlocked,
            'status' => $unlocked ? 'unlocked' : 'in_progress',
            'metadata' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}