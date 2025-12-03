import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppearance } from '@/hooks/use-appearance';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const { updateAppearance } = useAppearance();
    const initials = auth.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const handle = `@${(auth.user.email.split('@')[0] || auth.user.name || 'user').replace(/[^a-zA-Z0-9_]/g, '')}`;
    const verified = auth.user.email_verified_at !== null;
    useEffect(() => {
        updateAppearance('light');
    }, [updateAppearance]);

    return (
        <SettingsLayout>
            <Head title="Profile settings" />
            <div className="space-y-8">
                <div className="rounded-2xl bg-gradient-to-b from-purple-50 to-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14 ring-4 ring-purple-200">
                                <AvatarImage
                                    src={auth.user.avatar}
                                    alt={auth.user.name}
                                />
                                <AvatarFallback className="bg-purple-600 text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-bold">{auth.user.name}</h2>
                                <p className="text-sm text-neutral-600">{handle}</p>
                                <p className="text-xs text-neutral-500">Edit profil dan informasi akun</p>
                            </div>
                        </div>
                        <Badge
                            className={
                                verified
                                    ? 'border-0 bg-green-500 text-white'
                                    : 'border-0 bg-orange-100 text-orange-700'
                            }
                        >
                            {verified
                                ? 'Email terverifikasi'
                                : 'Email belum terverifikasi'}
                        </Badge>
                    </div>
                </div>
                <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                    <CardHeader>
                        <h3 className="text-lg font-bold text-gray-900">Informasi Profil</h3>
                        <p className="text-sm text-gray-600">Perbarui nama dan email kamu</p>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...ProfileController.update.form()}
                            options={{ preserveScroll: true }}
                            className="space-y-6"
                        >
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input id="name" className="mt-1 block w-full rounded-xl" defaultValue={auth.user.name} name="name" required autoComplete="name" placeholder="Nama lengkap" />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" className="mt-1 block w-full rounded-xl" defaultValue={auth.user.email} name="email" required autoComplete="username" placeholder="Alamat email" />
                                        <InputError className="mt-2" message={errors.email} />
                                    </div>

                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-neutral-700">
                                                Email kamu belum terverifikasi.{' '}
                                                <Link href={send()} as="button" className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current!">
                                                    Kirim ulang tautan verifikasi.
                                                </Link>
                                            </p>
                                            {status === 'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">Tautan verifikasi baru telah dikirim ke email kamu.</div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6">
                                        <Button disabled={processing} data-test="update-profile-button" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-transform hover:scale-[1.02]">Simpan</Button>
                                        <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                                            <p className="text-sm text-purple-700">Tersimpan</p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>

            <DeleteUser />
        </SettingsLayout>
    );
}
