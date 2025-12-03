<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Auth\SupabaseAuthService;

class NewPasswordController extends Controller
{
    /**
     * Show the password reset page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->query('access_token') ?? $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'nullable|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $service = new SupabaseAuthService();
        $updated = $service->updatePassword($request->token, $request->password);

        if ($updated) {
            return to_route('login')->with('status', __('passwords.reset'));
        }

        throw ValidationException::withMessages([
            'email' => [__('passwords.token')],
        ]);
    }
}
