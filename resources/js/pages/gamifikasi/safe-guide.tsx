import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { GamifikasiNav } from './components/nav';
import { Button } from '@/components/ui/button';
import { CodedexTemplateLayout } from './components/codedex-template-layout';
import { useGameStore } from '../mentoring/components/gamification/store/gameStore';

export default function GamifikasiSafeGuidePage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/safe-guide' },
    { title: 'Safe Guide', href: '/gamifikasi/safe-guide' },
  ];

  const [score, setScore] = useState(0);
  const startQuiz = () => { setScore(3); useGameStore.getState().markCompleted('safe_guide'); useGameStore.getState().addXP(5); };
  const progress = useGameStore((s: any) => s.progress ?? Math.min(100, (s.results?.length ?? 0) * 10));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Safe Use Guide" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />

        <CodedexTemplateLayout
          rightTopRatio={0.8}
          title="Safe Guide"
          left={
            <div className="space-y-3 text-sm">
              <h3 className="text-base font-semibold text-white">Mekanisme & Tujuan</h3>
              <p className="text-muted-foreground">Panduan penggunaan aman, kapan perlu bantuan profesional, etika jurnal dan privasi.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Pahami tanda bahaya dan jalur bantuan.</li>
                <li>Jaga kerahasiaan dan etika saat mencatat.</li>
              </ul>
            </div>
          }
          rightTop={
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Artikel singkat: kapan perlu bantuan profesional, cara pakai fitur dengan aman, etika jurnal & privasi.</p>
              <Button variant="default" onClick={startQuiz} className="transition hover:opacity-90">Mulai Kuis (3 soal)</Button>
              <div className="text-xs">Skor kuis: {score}/3</div>
            </div>
          }
          rightBottom={
            <div className="space-y-4">
              <h4 className="text-white/90 font-medium">Petunjuk & Tips</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Catat nomor darurat dan kontak support lokal.</li>
                <li>Gunakan fitur journaling dengan proteksi sandi.</li>
                <li>Review izin privasi sebelum berbagi konten.</li>
              </ol>
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