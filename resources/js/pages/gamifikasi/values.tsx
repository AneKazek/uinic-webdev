import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { GamifikasiNav } from './components/nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodedexTemplateLayout } from './components/codedex-template-layout';
import { useGameStore } from '../mentoring/components/gamification/store/gameStore';

export default function GamifikasiValuesPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/values' },
    { title: 'Values', href: '/gamifikasi/values' },
  ];

  const VALUES = ['Integritas','Kebaikan','Keluarga','Pembelajaran','Kesehatan','Tanggung jawab','Kreativitas','Keberanian'];
  const [chosen, setChosen] = useState<string[]>([]);
  const [motto, setMotto] = useState('');
  const toggle = (v: string) => setChosen((prev)=> prev.includes(v)? prev.filter(x=>x!==v): [...prev, v]);
  const save = () => { useGameStore.getState().markCompleted('values'); useGameStore.getState().addXP(15); if (motto.length) useGameStore.getState().addCoin(1); };
  const progress = useGameStore((s: any) => s.progress ?? Math.min(100, (s.results?.length ?? 0) * 10));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Values Forge" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />

        <CodedexTemplateLayout
          rightTopRatio={0.8}
          title="Values Forge (Motto)"
          left={
            <div className="space-y-3 text-sm">
              <h3 className="text-base font-semibold text-white">Mekanisme & Tujuan</h3>
              <p className="text-muted-foreground">Pilih nilai inti yang paling penting bagimu, kemudian rangkai motto singkat sebagai kompas sehari‑hari.</p>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Aturan</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Pilih 3–5 nilai inti.</li>
                  <li>Motto ≤ 12 kata, jelas dan bisa ditindaklanjuti.</li>
                  <li>Tekan Simpan untuk merekam hasil.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white/90 font-medium">Tujuan Belajar</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Menjernihkan prioritas dan arah keputusan.</li>
                  <li>Menumbuhkan motivasi intrinsik.</li>
                </ul>
              </div>
            </div>
          }
          rightTop={
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {VALUES.map(v=> (
                  <Button key={v} variant={chosen.includes(v)? 'default': 'outline'} size="sm" onClick={()=>toggle(v)} className="transition hover:ring-2 hover:ring-violet-600">{v}</Button>
                ))}
              </div>
              <Input value={motto} onChange={(e)=> setMotto(e.target.value)} placeholder="Motto ≤12 kata" />
              <Button variant="default" onClick={save} className="transition hover:opacity-90">Simpan Nilai & Motto</Button>
            </div>
          }
          rightBottom={
            <div className="space-y-4">
              <h4 className="text-white/90 font-medium">Petunjuk & Tips</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Pilih nilai yang benar‑benar mencerminkan dirimu, bukan ekspektasi orang lain.</li>
                <li>Buat motto yang spesifik, positif, dan dapat dieksekusi.</li>
                <li>Letakkan motto di tempat yang mudah dilihat setiap hari.</li>
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