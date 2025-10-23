import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { GamifikasiNav } from './components/nav';
import { Button } from '@/components/ui/button';
import { PixiCanvas } from '../mentoring/components/gamification/PixiCanvas';
import { CodedexTemplateLayout } from './components/codedex-template-layout';
import { useGameStore } from '../mentoring/components/gamification/store/gameStore';
import { GameHUD } from './components/game-hud';
import { GameLoadingOverlay } from './components/game-loading-overlay';

export default function GamifikasiBreathPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/breath' },
    { title: 'Breath', href: '/gamifikasi/breath' },
  ];

  const progress = useGameStore((s: any) => s.progress ?? Math.min(100, (s.results?.length ?? 0) * 10));
  const [ready, setReady] = React.useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Breath" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />

        <CodedexTemplateLayout
          rightTopRatio={0.8}
          title="Breathe 4‑4‑6"
          left={
            <div className="space-y-3 text-sm">
              <h3 className="text-base font-semibold text-white">Mekanisme & Tujuan</h3>
              <p className="text-muted-foreground">Latihan napas ritmis 4‑4‑6 untuk menurunkan ketegangan: tarik 4 detik, tahan 4 detik, hembus 6 detik.</p>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Aturan</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Ikuti panduan siklus di layar.</li>
                  <li>Fokus pada napas; hindari menahan napas terlalu lama.</li>
                  <li>Selesaikan minimal 3 siklus.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Tujuan Belajar</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Regulasi fisiologis melalui napas.</li>
                  <li>Meningkatkan fokus dan ketenangan.</li>
                </ul>
              </div>
            </div>
          }
          rightTop={
            <div className="w-full h-full">
              <div className="relative w-full h-full">
                <PixiCanvas scene="Breath" onReady={() => setReady(true)} />
                <div className="absolute top-2 left-2">
                  <GameHUD />
                </div>
                <GameLoadingOverlay visible={!ready} />
              </div>
            </div>
          }
          rightBottom={
            <div className="space-y-4">
              <h4 className="text-white/90 font-medium">Petunjuk & Tips</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Ikuti animasi lingkaran untuk tempo napas.</li>
                <li>Jika pusing, perlambat siklus atau berhenti.</li>
                <li>Usahakan siklus konsisten selama 3–5 menit.</li>
              </ol>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="transition hover:ring-2 hover:ring-violet-600">Ubah tempo</Button>
                <Button variant="default" className="transition hover:opacity-90">Mulai 3 Siklus</Button>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Progres latihan</div>
                <div className="h-2 w-full bg-neutral-800 rounded">
                  <div className="h-2 bg-violet-500 rounded" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="text-xs text-muted-foreground">{Math.min(progress, 100)}%</div>
              </div>
            </div>
          }
        />
      </div>
    </AppLayout>
  );
}