import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { GamifikasiNav } from './components/nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodedexTemplateLayout } from './components/codedex-template-layout';
import { useGameStore } from '../mentoring/components/gamification/store/gameStore';

export default function GamifikasiCompassionPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/compassion' },
    { title: 'Compassion', href: '/gamifikasi/compassion' },
  ];

  const [a, setA] = useState('Aku melihat…');
  const [b, setB] = useState('Aku paham…');
  const [c, setC] = useState('Aku mendukungmu dengan…');
  const schedule = () => { useGameStore.getState().markCompleted('compassion'); useGameStore.getState().addXP(15); };
  const progress = useGameStore((s: any) => s.progress ?? Math.min(100, (s.results?.length ?? 0) * 10));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Compassion Courier" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />

        <CodedexTemplateLayout
          rightTopRatio={0.8}
          title="Compassion Trainer"
          left={
            <div className="space-y-3 text-sm">
              <h3 className="text-base font-semibold text-white">Mekanisme & Tujuan</h3>
              <p className="text-muted-foreground">Kirim surat empati tiga bagian untuk melatih perspektif dan dukungan konstruktif.</p>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Aturan</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Tulis tiga kalimat: observasi, pemahaman, dukungan.</li>
                  <li>Gunakan bahasa netral dan tidak menghakimi.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Tujuan Belajar</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Melatih empati berbasis tindakan nyata.</li>
                </ul>
              </div>
            </div>
          }
          rightTop={
            <div className="space-y-3">
              <Input value={a} onChange={(e)=>setA(e.target.value)} placeholder="Aku melihat…" />
              <Input value={b} onChange={(e)=>setB(e.target.value)} placeholder="Aku paham…" />
              <Input value={c} onChange={(e)=>setC(e.target.value)} placeholder="Aku mendukungmu dengan…" />
              <Button variant="default" onClick={schedule} className="transition hover:opacity-90">Jadwalkan ke Kotak Masuk (7 hari)</Button>
            </div>
          }
          rightBottom={
            <div className="space-y-4">
              <h4 className="text-white/90 font-medium">Petunjuk & Tips</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Mulai dari observasi objektif sebelum menyampaikan dukungan.</li>
                <li>Validasi perasaan tanpa memberi nasihat terlalu cepat.</li>
                <li>Tawarkan bantuan spesifik dan realistis.</li>
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