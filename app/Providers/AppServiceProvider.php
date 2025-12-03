<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SupabaseAuthService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();

                if (! $user) {
                    return [
                        'user' => null,
                    ];
                }

                $name = $user->name;

                // Prefer Supabase user metadata name when available
                $accessToken = request()->session()->get('supabase.access_token');
                if ($accessToken) {
                    $service = new SupabaseAuthService();
                    $supabaseUser = $service->getUser($accessToken);

                    if (is_array($supabaseUser)) {
                        $metaName = $supabaseUser['user_metadata']['name']
                            ?? ($supabaseUser['user_metadata']['full_name'] ?? null);

                        if (! empty($metaName)) {
                            $name = $metaName;
                        }
                    }
                }

                return [
                    'user' => [
                        'id'    => $user->id,
                        'name'  => $name,
                        'email' => $user->email,
                    ],
                ];
            },
        ]);
    }
}
