import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { GamifikasiNav } from './components/nav';

// Import CSS global referensi agar UI identik
import './alchemist_ref/globals.css';

// Import halaman referensi yang telah disalin
import Home from './alchemist_ref/app/page';
import MixerPage from './alchemist_ref/app/mixer/page';
import LabelsPage from './alchemist_ref/app/labels/page';
import InterventionPage from './alchemist_ref/app/intervention/page';
import ReflectionPage from './alchemist_ref/app/reflection/page';
import RewardsPage from './alchemist_ref/app/rewards/page';

function useHashRoute() {
  const [route, setRoute] = React.useState<string>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    return hash.replace(/^#/, '') || '/';
  });
  React.useEffect(() => {
    const handler = () => {
      const next = window.location.hash.replace(/^#/, '') || '/';
      setRoute(next);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return route;
}

function AlchemistRefHost() {
  const route = useHashRoute();
  switch (route) {
    case '/':
      return <Home />;
    case '/mixer':
      return <MixerPage />;
    case '/labels':
      return <LabelsPage />;
    case '/intervention':
      return <InterventionPage />;
    case '/reflection':
      return <ReflectionPage />;
    case '/rewards':
      return <RewardsPage />;
    default:
      return <Home />;
  }
}

export default function GamifikasiAlchemistPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gamifikasi', href: '/gamifikasi/alchemist' },
    { title: 'Alchemist', href: '/gamifikasi/alchemist' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gamifikasi — Alchemist" />
      <div className="space-y-6 p-4">
        <GamifikasiNav />
        {/* Host merender aplikasi referensi secara identik (menggunakan hash routing) */}
        <div className="w-full">
          <AlchemistRefHost />
        </div>
      </div>
    </AppLayout>
  );
}