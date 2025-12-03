"use client";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { Menu, Sparkles, Brain, Trophy, Target, ShoppingCart, Award } from "lucide-react";
import { mentoring, leaderboard, missions, shop, profile, dashboard } from "@/routes";

type Item = { href: string; label: string; icon: any };

export default function DashboardTopNav({ items, fullWidth }: { items?: Item[]; fullWidth?: boolean }) {
  const page = usePage<any>();
  const name: string = page?.props?.auth?.user?.name ?? "Player";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.removeProperty("overflow");
    };
  }, [isMobileMenuOpen]);
  const quickActions: Item[] =
    items ?? [
      { icon: Brain, label: "Belajar", href: mentoring().url },
      { icon: Trophy, label: "Skor", href: leaderboard().url },
      { icon: Target, label: "Misi", href: missions().url },
      { icon: ShoppingCart, label: "Toko", href: shop().url },
      { icon: Award, label: "Lainnya", href: "/" },
    ];

  const currentUrl = page?.url ?? "";

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
      <div className={fullWidth ? "w-full px-0" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className="flex items-center justify-between h-16">
          <Link href={dashboard().url} className="flex items-center gap-3" prefetch>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">MindPath</h1>
              <p className="text-xs text-gray-500">Perjalanan Mental Sehat</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {quickActions.map((action, idx) => {
              const isActive = currentUrl === action.href;
              const Icon = action.icon;
              const activeGradient = "bg-gradient-to-r from-purple-500 to-pink-600";
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive ? `${activeGradient} text-white shadow-lg scale-105` : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{action.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={profile().url}
              prefetch
              className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {name.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-purple-900">Profil</span>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Buka menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              {isMobileMenuOpen ? (
                <span className="inline-block w-6 h-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
    {isMobileMenuOpen && (
      <>
        <div
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="fixed top-16 left-0 z-50 w-full bg-white shadow-xl md:hidden">
          <div className="p-4 space-y-3">
            {quickActions.map((action, idx) => {
              const isActive = (page?.url ?? "") === action.href;
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                    isActive ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{action.label}</span>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    )}
    </>
  );
}
