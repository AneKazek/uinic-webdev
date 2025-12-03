<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AchievementsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'slug' => 'wildfire',
                'title' => 'Wildfire',
                'description' => 'Reach a 365 day streak',
                'goal' => 365,
                'unit' => 'days',
                'icon_url' => null,
                'gradient' => 'from-orange-400 to-amber-500',
            ],
            [
                'slug' => 'sage',
                'title' => 'Sage',
                'description' => 'Earn 12500 XP',
                'goal' => 12500,
                'unit' => 'xp',
                'icon_url' => null,
                'gradient' => 'from-green-400 to-emerald-500',
            ],
            [
                'slug' => 'champion',
                'title' => 'Champion',
                'description' => 'Advance to the Emerald League',
                'goal' => 1,
                'unit' => 'league',
                'icon_url' => null,
                'gradient' => 'from-yellow-400 to-amber-500',
            ],
            [
                'slug' => 'mindful-master',
                'title' => 'Mindful Master',
                'description' => 'Complete 50 wellness lessons',
                'goal' => 50,
                'unit' => 'lessons',
                'icon_url' => null,
                'gradient' => 'from-blue-400 to-cyan-500',
            ],
            [
                'slug' => 'gratitude-guardian',
                'title' => 'Gratitude Guardian',
                'description' => 'Log mood for 30 consecutive days',
                'goal' => 30,
                'unit' => 'days',
                'icon_url' => null,
                'gradient' => 'from-purple-400 to-fuchsia-500',
            ],
        ];

        DB::table('achievements')->upsert($items, ['slug']);
    }
}