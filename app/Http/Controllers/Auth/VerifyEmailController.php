<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Auth\SupabaseAuthService;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $service = new SupabaseAuthService();

        if (($request->user() && $request->user()->hasVerifiedEmail()) || $service->isVerifiedFromSession()) {
            if ($request->user() && !$request->user()->hasVerifiedEmail()) {
                $request->fulfill();
            }

            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        return redirect()->route('verification.notice')->with('status', 'verification-pending');
    }
}
