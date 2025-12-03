<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Auth\SupabaseAuthService;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $service = new SupabaseAuthService();

        // Keep rate limiting behavior
        $request->ensureIsNotRateLimited();

        $signIn = $service->signInWithPassword($request->email, $request->password);
        if ($signIn === false || empty($signIn['access_token'])) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        // Retrieve Supabase user and sync to local User model
        $supabaseUser = $service->getUser($signIn['access_token']);
        if ($supabaseUser === false) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $user = $service->syncLocalUser($supabaseUser, $request->password);

        if (Features::enabled(Features::twoFactorAuthentication()) && $user->hasEnabledTwoFactorAuthentication()) {
            $request->session()->put([
                'login.id' => $user->getKey(),
                'login.remember' => $request->boolean('remember'),
            ]);

            return to_route('two-factor.login');
        }

        Auth::login($user, $request->boolean('remember'));

        // Store Supabase tokens in session for later use
        $request->session()->put('supabase.access_token', $signIn['access_token']);
        if (!empty($signIn['refresh_token'])) {
            $request->session()->put('supabase.refresh_token', $signIn['refresh_token']);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $accessToken = $request->session()->get('supabase.access_token');
        if ($accessToken) {
            $service = new SupabaseAuthService();
            $service->logout($accessToken);
        }

        Auth::guard('web')->logout();

        $request->session()->forget(['supabase.access_token', 'supabase.refresh_token']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
