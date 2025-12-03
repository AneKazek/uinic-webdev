"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Moon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Learn", href: "/courses", dropdown: true },
  { name: "Practice", href: "#", dropdown: true },
  { name: "Build", href: "/builds", dropdown: false },
  { name: "Community", href: "/community", dropdown: true },
  { name: "Pricing", href: "/pricing", dropdown: false },
];

const HeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E1A]">
        {/* Desktop Header */}
        <div className="container mx-auto hidden h-16 items-center justify-between px-6 lg:flex">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/coin-cropped-1.png"
                alt="Codédex coin logo"
                width={25}
                height={28}
                priority
              />
              <span className="font-accent text-xl text-white">Codédex</span>
            </Link>

            <nav>
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-base font-normal text-white transition-colors hover:text-primary"
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown size={16} className="mt-0.5" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/90 hover:bg-white/10 hover:text-white">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/90 hover:bg-white/10 hover:text-white">
              <Moon size={20} />
            </Button>
            <Button asChild className="bg-[#F5C518] text-black px-4 py-2 text-base font-extrabold shadow-[0_3px_0_0_#A88C00] hover:-translate-y-px hover:shadow-[0_2px_0_0_#A88C00] transition-transform">
              <Link href="/pricing">Join Club</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between px-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/coin-cropped-1.png"
              alt="Codédex coin logo"
              width={25}
              height={28}
              priority
            />
            <span className="font-accent text-xl text-white">Codédex</span>
          </Link>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-white/90 hover:bg-white/10 hover:text-white">
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/90 hover:bg-white/10 hover:text-white"
            >
              <span className="sr-only">Toggle menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-full bg-secondary-background p-6 lg:hidden">
          <div className="flex h-full flex-col">
            <nav className="flex-grow">
              <ul className="space-y-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between text-lg font-semibold text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {item.dropdown && <ChevronDown size={20} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto">
              <Button asChild className="w-full py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderNavigation;