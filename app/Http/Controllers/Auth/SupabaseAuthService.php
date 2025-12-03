<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;

class SupabaseAuthService
{
    protected string $url;
    protected string $anonKey;

    public function __construct()
    {
        $this->url = rtrim(env('SUPABASE_URL', ''), '/');
        $this->anonKey = env('SUPABASE_ANON_KEY', '');
    }

    public function signUp(string $email, string $password, ?string $name = null): array|false
    {
        if (!$this->url || !$this->anonKey) {
            return false;
        }

        $payload = [
            'email' => $email,
            'password' => $password,
        ];
        if ($name !== null) {
            $payload['data'] = ['name' => $name];
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Content-Type' => 'application/json',
        ])->post($this->url . '/auth/v1/signup', $payload);

        if (!$response->successful()) {
            return false;
        }

        return $response->json();
    }

    public function signInWithPassword(string $email, string $password): array|false
    {
        if (!$this->url || !$this->anonKey) {
            return false;
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Content-Type' => 'application/json',
        ])->post($this->url . '/auth/v1/token?grant_type=password', [
            'email' => $email,
            'password' => $password,
        ]);

        if (!$response->successful()) {
            return false;
        }

        return $response->json();
    }

    public function getUser(string $accessToken): array|false
    {
        if (!$this->url || !$this->anonKey || !$accessToken) {
            return false;
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Authorization' => 'Bearer ' . $accessToken,
        ])->get($this->url . '/auth/v1/user');

        if (!$response->successful()) {
            return false;
        }

        return $response->json();
    }

    public function resendEmailVerification(string $email): bool
    {
        if (!$this->url || !$this->anonKey) {
            return false;
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Content-Type' => 'application/json',
        ])->post($this->url . '/auth/v1/resend?type=signup', [
            'email' => $email,
        ]);

        return $response->successful();
    }

    public function sendPasswordReset(string $email, ?string $redirectTo = null): bool
    {
        if (!$this->url || !$this->anonKey) {
            return false;
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Content-Type' => 'application/json',
        ])->post($this->url . '/auth/v1/recover', [
            'email' => $email,
            'redirect_to' => $redirectTo ?? url('/reset-password/supabase'),
        ]);

        return $response->successful();
    }

    public function updatePassword(string $accessToken, string $newPassword): bool
    {
        if (!$this->url || !$this->anonKey || !$accessToken) {
            return false;
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Authorization' => 'Bearer ' . $accessToken,
            'Content-Type' => 'application/json',
        ])->put($this->url . '/auth/v1/user', [
            'password' => $newPassword,
        ]);

        return $response->successful();
    }

    public function logout(?string $accessToken): bool
    {
        if (!$this->url || !$this->anonKey || !$accessToken) {
            return false;
        }

        $response = Http::withHeaders([
            'apikey' => $this->anonKey,
            'Authorization' => 'Bearer ' . $accessToken,
        ])->post($this->url . '/auth/v1/logout');

        return $response->successful();
    }

    public function syncLocalUser(array $supabaseUser, ?string $password = null): User
    {
        $email = $supabaseUser['email'] ?? null;
        $name = $supabaseUser['user_metadata']['name'] ?? ($supabaseUser['user_metadata']['full_name'] ?? null);
        $emailConfirmedAt = $supabaseUser['email_confirmed_at'] ?? null;

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name ?? $email,
                'password' => $password ?? str()->random(24),
            ]
        );

        if ($name && $user->name !== $name) {
            $user->name = $name;
        }

        if ($emailConfirmedAt && !$user->email_verified_at) {
            $user->email_verified_at = Carbon::parse($emailConfirmedAt);
        }

        $user->save();

        return $user;
    }

    public function isVerified(array $supabaseUser): bool
    {
        return !empty($supabaseUser['email_confirmed_at']);
    }

    public function isVerifiedFromSession(): bool
    {
        $accessToken = session('supabase.access_token');
        if (!$accessToken) {
            return false;
        }

        $supabaseUser = $this->getUser($accessToken);
        if (!is_array($supabaseUser)) {
            return false;
        }

        return !empty($supabaseUser['email_confirmed_at']);
    }
}