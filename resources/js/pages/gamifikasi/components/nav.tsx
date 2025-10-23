import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useClickSfx } from './use-click-sfx';

export function GamifikasiNav() {
  const items = [
    { title: 'Alchemist', href: '/gamifikasi/alchemist' },
    { title: 'Breath', href: '/gamifikasi/breath' },
    { title: 'Focus', href: '/gamifikasi/focus' },
    { title: 'BossRush', href: '/gamifikasi/boss' },
    { title: 'Guardian', href: '/gamifikasi/guardian' },
    { title: 'Values', href: '/gamifikasi/values' },
    { title: 'Compassion', href: '/gamifikasi/compassion' },
    { title: 'Safe Guide', href: '/gamifikasi/safe-guide' },
  ];
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const sfx = useClickSfx();
  return (
    <Card className="bg-card border-2 border-border rounded-xl">
      <CardContent className="p-4 flex flex-wrap gap-2">
        {items.map((it) => (
          <Link key={it.title} href={it.href} prefetch>
            <Button
              variant={currentPath === it.href ? 'default' : 'outline'}
              size="sm"
              className="transition-transform active:scale-95"
              onClick={() => sfx.play()}
            >
              {it.title}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}