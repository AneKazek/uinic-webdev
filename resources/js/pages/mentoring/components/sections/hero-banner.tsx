"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundStyle = { transform: `translateY(${scrollY * 0.3}px)` };
  const snakeStyle = { transform: `translateY(${scrollY * 0.15}px)` };

  return (
    <section className="relative flex h-[480px] w-full items-center justify-center overflow-hidden bg-background md:h-[520px]">
      {/* Layer 1: Parallax Background */}
      <div className="absolute inset-0 z-0" style={backgroundStyle}>
        <Image
          src="/images/mentoring/chapter_1/cobaBanner.jpg"
          alt="Python course pixel banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          unoptimized
        />
      </div>

      {/* Layer 3: Darkening Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/70 via-background/20 to-transparent"></div>

      {/* Layer 4: Content */}
      <div className="absolute left-6 md:left-16 lg:left-24 top-1/2 -translate-y-[22%] z-30 flex max-w-[640px] flex-col items-start text-left">
        {/* Top badge */}
        <div className="mb-3 flex items-center gap-2 rounded-full bg-foreground/10 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/90">Beginner</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Course</span>
        </div>
        <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl leading-none text-foreground drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)] mb-3">
          Level Up Your Mind
        </h1>
        <p className="font-body max-w-[600px] text-base md:text-lg text-foreground mb-5">
          Pelajari cara mengenali suasana hati, menyelesaikan misi kecil, dan naik level dalam perjalanan menjaga kesehatan mentalmu. 🌱
        </p>
        <Link href="/python/01-setting-up" prefetch>
          <Button className="rounded-sm">Resume Learning</Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;