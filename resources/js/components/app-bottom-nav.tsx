import { Link, usePage } from '@inertiajs/react';
import { type NavItem } from '@/types';
import { dashboard, missions, profile, shop } from '@/routes';
import { Home, Shield, Package, ShoppingBag, UserRound, Ellipsis } from 'lucide-react';

// Mobile bottom navigation that mirrors the sidebar items
export default function AppBottomNav() {
    const page = usePage();

    const items: NavItem[] = [
        { title: 'Belajar', href: dashboard(), icon: Home },
        // { title: 'BUNYI', href: dashboard(), icon: Megaphone }, // removed
        { title: 'PAPAN SKOR', href: '/leaderboard', icon: Shield },
        { title: 'MISI', href: missions(), icon: Package },
        { title: 'TOKO', href: shop(), icon: ShoppingBag },
        { title: 'PROFIL', href: profile(), icon: UserRound },
        { title: 'LAINNYA', href: '#', icon: Ellipsis },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-sidebar-border/70 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/75">
            <ul className="flex items-center justify-between px-3 py-2">
                {items.map((item) => {
                    const href = typeof item.href === 'string' ? item.href : item.href.url;
                    const isActive = href !== '#' && page.url.startsWith(href);
                    const Icon = item.icon as any;
                    return (
                        <li key={item.title} className="flex-1">
                            <Link
                                href={item.href}
                                prefetch
                                className="group flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-wide"
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                                        isActive
                                            ? 'border-sky-400/60 bg-sky-500/10 ring-2 ring-sky-400/60'
                                            : 'border-sidebar-border/60 bg-sidebar hover:border-sky-400/40'
                                    }`}
                                >
                                    {Icon && <Icon className="h-5 w-5" />}
                                </div>
                                <span className={isActive ? 'text-foreground' : 'text-muted-foreground'}>{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}