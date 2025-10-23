import React from 'react';

export function ThreePanelLayout({
  left,
  rightTop,
  rightBottom,
  title,
  fitToViewport = false,
  rightTopRatio = 0.62,
}: {
  left: React.ReactNode;
  rightTop: React.ReactNode;
  rightBottom: React.ReactNode;
  title?: string;
  fitToViewport?: boolean;
  rightTopRatio?: number;
}) {
  const top = Math.min(Math.max(rightTopRatio, 0.5), 0.8);
  const bottom = 1 - top;

  return (
    <div className={fitToViewport ? "px-4 lg:px-6 h-[calc(100svh-140px)] overflow-hidden" : "px-4 lg:px-6"}>
      {title && (
        <h2 className={fitToViewport ? "text-lg lg:text-xl font-semibold tracking-tight text-white mb-3" : "text-xl lg:text-2xl font-semibold tracking-tight text-white mb-4"}>{title}</h2>
      )}
      <div className={fitToViewport ? "grid grid-cols-1 lg:grid-cols-12 gap-4 h-full" : "grid grid-cols-1 lg:grid-cols-12 gap-6"}>
        {/* Left panel */}
        <section className={fitToViewport ? "lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3" : "lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4"}>
          {left}
        </section>

        {/* Right panels */}
        <section className={fitToViewport ? "lg:col-span-8 flex flex-col gap-4 h-full" : "lg:col-span-8 flex flex-col gap-6"}>
          {/* Right Top: Game Area */}
          <div
            className={fitToViewport ? "bg-neutral-950 border border-neutral-800 rounded-2xl p-3 lg:p-4 h-full" : "bg-neutral-950 border border-neutral-800 rounded-2xl p-4 lg:p-6"}
            style={fitToViewport ? { flex: `0 0 ${top * 100}%`, height: `${top * 100}%` } : undefined}
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              {/* Let content decide its internal sizing when not fit; in fit mode, fill parent */}
              {rightTop}
            </div>
          </div>

          {/* Right Bottom: Hints */}
          <div
            className={fitToViewport ? "bg-neutral-900 border border-neutral-800 rounded-2xl p-4 h-full" : "bg-neutral-900 border border-neutral-800 rounded-2xl p-6"}
            style={fitToViewport ? { flex: `0 0 ${bottom * 100}%`, height: `${bottom * 100}%` } : undefined}
          >
            {rightBottom}
          </div>
        </section>
      </div>
    </div>
  );
}