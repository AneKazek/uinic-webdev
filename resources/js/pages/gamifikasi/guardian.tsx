import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { GamifikasiNav } from './components/nav';
import { Button } from '@/components/ui/button';
import { CodedexTemplateLayout } from './components/codedex-template-layout';
import { useGameStore } from '../mentoring/components/gamification/store/gameStore';

export default function GamifikasiGuardianPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/guardian' },
    { title: 'Guardian', href: '/gamifikasi/guardian' },
  ];

  const [loadout, setLoadout] = useState<string[]>([]);
  const toggle = (k: string) => setLoadout((prev) => prev.includes(k) ? prev.filter(x=>x!==k) : [...prev, k]);
  const save = () => { useGameStore.getState().markCompleted('guardian'); useGameStore.getState().addXP(10); };
  const progress = useGameStore((s: any) => s.progress ?? Math.min(100, (s.results?.length ?? 0) * 10));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Guardian Setup" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />

        <CodedexTemplateLayout
          rightTopRatio={0.8}
          title="Guardian"
          left={
            <div className="space-y-3 text-sm">
              <h3 className="text-base font-semibold text-white">Mekanisme & Tujuan</h3>
              <p className="text-muted-foreground">Bangun loadout teknik grounding dan tombol bantuan sebagai penjaga pribadi ketika stres meningkat.</p>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Aturan</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Pilih 3 teknik + 1 tombol bantuan.</li>
                  <li>Simpan loadout untuk dipakai lintas halaman.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Tujuan Belajar</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Mempersiapkan strategi aman saat butuh grounding cepat.</li>
                </ul>
              </div>
            </div>
          }
          rightTop={
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Pilih 3 teknik grounding + 1 tombol bantuan.</div>
              <div className="flex flex-wrap gap-2">
                {['5-4-3-2-1','Napas 4-4-6','Cold Splash','Body Scan','Help Button'].map(k=> (
                  <Button key={k} variant={loadout.includes(k)? 'default': 'outline'} size="sm" onClick={()=>toggle(k)} className="transition hover:ring-2 hover:ring-violet-600">{k}</Button>
                ))}
              </div>
              <Button variant="default" onClick={save} className="transition hover:opacity-90">Add to Loadout</Button>
            </div>
          }
          rightBottom={
            <div className="space-y-4">
              <h4 className="text-white/90 font-medium">Petunjuk & Tips</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Grounding 5‑4‑3‑2‑1: sebutkan hal yang dilihat, dirasa, didengar.</li>
                <li>Gunakan Help Button untuk menghubungi kontak bantuan.</li>
                <li>Review loadout tiap minggu agar tetap relevan.</li>
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