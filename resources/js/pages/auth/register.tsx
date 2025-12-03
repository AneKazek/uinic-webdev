import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import React from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 relative overflow-hidden">
            <Head title="Register" />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-3xl animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-3xl animate-pulse" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="w-full max-w-md z-10">
                <Link href={"/"} className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <Card className="border-white/50 bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-white/50">
                    <CardHeader className="space-y-1 text-center">
                        <div className="w-12 h-12 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-200">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-800">Create an account</CardTitle>
                        <CardDescription className="text-slate-500 text-base">Enter your details to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...RegisteredUserController.store.form()} resetOnSuccess={["password", "password_confirmation"]} disableWhileProcessing className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-600 font-medium pl-1">Name</Label>
                                        <Input id="name" type="text" required autoFocus autoComplete="name" name="name" placeholder="Full name" className="bg-white/95 dark:bg-white/90 border-slate-200 focus:border-purple-300 focus:ring-purple-100 transition-all h-12" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-600 font-medium pl-1">Email</Label>
                                        <Input id="email" type="email" required autoComplete="email" name="email" placeholder="hello@mindpath.com" className="bg-white/95 dark:bg-white/90 border-slate-200 focus:border-purple-300 focus:ring-purple-100 transition-all h-12" />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-slate-600 font-medium pl-1">Password</Label>
                                        <div className="relative">
                                            <Input id="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password" name="password" placeholder="••••••••" className="bg-white/95 dark:bg-white/90 border-slate-200 focus:border-purple-300 focus:ring-purple-100 transition-all h-12 pr-10" />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" className="text-slate-600 font-medium pl-1">Confirm password</Label>
                                        <div className="relative">
                                            <Input id="password_confirmation" type={showConfirm ? 'text' : 'password'} required autoComplete="new-password" name="password_confirmation" placeholder="••••••••" className="bg-white/95 dark:bg-white/90 border-slate-200 focus:border-purple-300 focus:ring-purple-100 transition-all h-12 pr-10" />
                                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-200 border-0 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]" data-test="register-user-button" disabled={processing}>
                                        {processing ? (
                                            <div className="flex items-center gap-2"><Spinner /><span>Creating...</span></div>
                                        ) : (
                                            'Create account'
                                        )}
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-center mt-2">
                            <span className="text-slate-500 text-sm">Already have an account? </span>
                            <TextLink href={login()} className="text-purple-600 hover:text-purple-700 font-medium text-sm">Log in</TextLink>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
