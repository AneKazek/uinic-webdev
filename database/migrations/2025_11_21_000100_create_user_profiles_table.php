<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unique('user_id');

            $table->string('username', 50)->unique();
            $table->string('avatar_url', 2048)->nullable();
            $table->text('bio')->nullable();

            $table->unsignedSmallInteger('day_streak')->default(0);
            $table->unsignedInteger('total_xp')->default(0);
            $table->string('current_league', 32)->default('Bronze');
            $table->unsignedSmallInteger('league_week')->default(1);
            $table->unsignedInteger('top3_finishes')->default(0);

            $table->unsignedInteger('followers_count')->default(0);
            $table->unsignedInteger('following_count')->default(0);

            $table->timestamp('last_active_at')->nullable();
            $table->json('settings')->nullable();

            $table->timestamps();

            $table->index(['username']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};