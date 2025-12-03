<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\SupabaseAuthService;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        $service = new SupabaseAuthService();

        if (($request->user() && $request->user()->hasVerifiedEmail()) || $service->isVerifiedFromSession()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $sent = $service->resendEmailVerification($request->user()->email);

        return back()->with('status', $sent ? 'verification-link-sent' : 'verification-link-failed');
    }
}
