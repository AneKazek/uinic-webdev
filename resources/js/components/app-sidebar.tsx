import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, missions, profile, shop } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    // Megaphone, // removed per request
    Shield,
    Package,
    ShoppingBag,
    UserRound,
    Ellipsis,
} from 'lucide-react';
import AppLogo from './app-logo';

const navItems: NavItem[] = [
    { title: 'Belajar', href: dashboard(), icon: Home },
    { title: 'PAPAN SKOR', href: '/leaderboard', icon: Shield },
    { title: 'MISI', href: missions(), icon: Package },
    { title: 'TOKO', href: shop(), icon: ShoppingBag },
    { title: 'PROFIL', href: profile(), icon: UserRound },
    { title: 'LAINNYA', href: '#', icon: Ellipsis },
];

export function AppSidebar() {
    const page = usePage();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="space-y-1 p-2">
                    {navItems.map((item) => {
                        const href =
                            typeof item.href === 'string'
                                ? item.href
                                : item.href.url;
                        const isActive = href !== '#' && page.url.startsWith(href);
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    size="lg"
                                    isActive={isActive}
                                    className="rounded-xl border border-sidebar-border/60 bg-sidebar text-sidebar-foreground data-[active=true]:ring-2 data-[active=true]:ring-sky-400/60 hover:border-sky-400/40 group-data-[collapsible=icon]:p-0!"
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon className="h-5 w-5" />}
                                        <span className="font-semibold uppercase tracking-wide">
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
