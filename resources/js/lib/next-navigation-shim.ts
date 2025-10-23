// Minimal shim untuk Next.js `next/navigation` agar referensi bisa berjalan di Vite/React
export function useRouter() {
  return {
    push: (path: string) => {
      if (!path.startsWith('#')) {
        window.location.hash = `#${path}`;
      } else {
        window.location.hash = path;
      }
    },
    replace: (path: string) => {
      const url = new URL(window.location.href);
      url.hash = path.startsWith('#') ? path : `#${path}`;
      history.replaceState(null, '', url.toString());
    },
    back: () => window.history.back(),
  };
}

export function usePathname(): string {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const pathname = hash.replace(/^#/, '') || '/';
  return pathname;
}