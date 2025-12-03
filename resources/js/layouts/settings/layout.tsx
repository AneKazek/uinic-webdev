import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useEffect } from 'react';
import { Target, Trophy, Award, ShoppingCart, User, MoreHorizontal, Star } from 'lucide-react';
import { mentoring, leaderboard as leaderboardRoute, missions as missionsRoute, shop, profile as profileRoute } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';
import { type SharedData } from '@/types';

function NavTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                active
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    );
}

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { updateAppearance } = useAppearance();
    const { auth } = usePage<SharedData>().props;
    const name = auth?.user?.name ?? 'Player';

    useEffect(() => {
        updateAppearance('light');
    }, [updateAppearance]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                                <Star className="w-6 h-6 text-white fill-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">MindPath</h1>
                                <p className="text-xs text-gray-500">Perjalanan Mental Sehat</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            <Link href={mentoring()} className="contents" prefetch>
                                <NavTab icon={<Target className="w-4 h-4" />} label="Belajar" />
                            </Link>
                            <Link href={leaderboardRoute()} className="contents" prefetch>
                                <NavTab icon={<Trophy className="w-4 h-4" />} label="Skor" />
                            </Link>
                            <Link href={missionsRoute()} className="contents" prefetch>
                                <NavTab icon={<Award className="w-4 h-4" />} label="Misi" />
                            </Link>
                            <Link href={shop()} className="contents" prefetch>
                                <NavTab icon={<ShoppingCart className="w-4 h-4" />} label="Toko" />
                            </Link>
                            <Link href={profileRoute()} className="contents" prefetch>
                                <NavTab icon={<User className="w-4 h-4" />} label="Profil" />
                            </Link>
                            <NavTab icon={<MoreHorizontal className="w-4 h-4" />} label="Lainnya" />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                {name.slice(0, 1).toUpperCase()}
                            </div>
                            <span className="hidden sm:block font-semibold">{name}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {children}
            </div>
        </div>
    );
}
