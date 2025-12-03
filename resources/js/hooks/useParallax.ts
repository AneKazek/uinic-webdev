import { useEffect } from 'react';

type UseParallaxOptions = {
  speed?: number; // 0.0 - 1.0, positive for same direction as scroll
  axis?: 'y' | 'x';
  mobileFactor?: number; // reduce effect on mobile
};

export function useParallax(
  el: React.RefObject<HTMLElement>,
  { speed = 0.15, axis = 'y', mobileFactor = 0.6 }: UseParallaxOptions = {}
) {
  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // Respect accessibility

    let rafId = 0;
    let baseTop = 0;
    let currentSpeed = speed;

    const isMobile = window.innerWidth < 768;
    if (isMobile) currentSpeed *= mobileFactor;

    const computeBase = () => {
      const rect = node.getBoundingClientRect();
      baseTop = rect.top + window.scrollY;
    };

    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const delta = scrollY - baseTop;
      const translate = Math.max(Math.min(delta * currentSpeed, 200), -200); // Clamp for sanity
      if (axis === 'y') {
        node.style.transform = `translate3d(0, ${translate}px, 0)`;
      } else {
        node.style.transform = `translate3d(${translate}px, 0, 0)`;
      }
      node.style.willChange = 'transform';
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      computeBase();
      onScroll();
    };

    computeBase();
    // Use passive listeners for performance
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    // Initial paint
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      node.style.willChange = '';
      node.style.transform = '';
    };
  }, [el, speed, axis, mobileFactor]);
}