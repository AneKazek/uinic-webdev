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

export default function GamifikasiBossPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/boss' },
    { title: 'BossRush', href: '/gamifikasi/boss' },
  ];

  const progress = useGameStore((s: any) => s.progress ?? Math.min(100, (s.results?.length ?? 0) * 10));
  const [ready, setReady] = React.useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Boss Rush" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />

        <CodedexTemplateLayout
          rightTopRatio={0.8}
          title="Boss Challenge"
          left={
            <div className="space-y-3 text-sm">
              <h3 className="text-base font-semibold text-white">Mekanisme & Tujuan</h3>
              <p className="text-muted-foreground">Kenali distorsi kognitif dari dialog bos, pilih template reframe yang tepat untuk menurunkan HP.</p>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Aturan</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Baca gelembung pikiran bos dengan saksama.</li>
                  <li>Pilih satu distorsi yang paling relevan.</li>
                  <li>Pilih template reframe yang sesuai dengan distorsi.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Tujuan Belajar</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Mengenali pola berpikir yang tidak membantu.</li>
                  <li>Melatih perumusan ulang (reframe) yang adaptif.</li>
                </ul>
              </div>
            </div>
          }
          rightTop={
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <PixiCanvas scene="BossRush" onReady={() => setReady(true)} />
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
                <li>Identifikasi kata kunci yang memicu distorsi.</li>
                <li>Catat alasan logis mengapa pikiran itu tidak akurat.</li>
                <li>Pilih template reframe yang menyeimbangkan pikiran.</li>
              </ol>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="transition hover:ring-2 hover:ring-violet-600">Lihat contoh reframe</Button>
                <Button variant="default" className="transition hover:opacity-90">Mulai ronde berikutnya</Button>
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