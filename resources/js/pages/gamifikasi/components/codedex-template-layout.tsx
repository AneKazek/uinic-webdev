import React from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

export function CodedexTemplateLayout({
  title,
  left,
  rightTop,
  rightBottom,
  rightTopRatio = 0.8,
}: {
  title?: string;
  left: React.ReactNode;
  rightTop: React.ReactNode;
  rightBottom: React.ReactNode;
  rightTopRatio?: number;
}) {
  const topPct = Math.min(Math.max(rightTopRatio, 0.6), 0.9) * 100;
  const bottomPct = 100 - topPct;

  return (
    <div className="px-4 lg:px-6">
      {title && (
        <h2 className="text-xl lg:text-2xl font-semibold tracking-tight text-white mb-4">{title}</h2>
      )}
      <div className="h-[calc(100svh-140px)]">
        <PanelGroup direction="horizontal" className="flex h-full bg-[var(--color-primary-background)]">
          {/* Left pane */}
          <Panel defaultSize={40} minSize={28} className="h-full">
            <div className="h-full w-full overflow-y-auto bg-[#0d1525] p-6 lg:p-10 rounded-2xl border border-[var(--color-border)]">
              {left}
            </div>
          </Panel>
          <PanelResizeHandle className="w-2 mx-2 cursor-col-resize rounded bg-[var(--color-border)]/20 hover:bg-[var(--color-border)]/40 transition-colors" />
          {/* Right pane: vertical split for game + hints */}
          <Panel defaultSize={60} minSize={30} className="h-full">
            <div className="h-full w-full rounded-2xl overflow-hidden">
              <PanelGroup direction="vertical" className="h-full">
                <Panel defaultSize={topPct} minSize={50} className="h-full">
                  <div className="h-full bg-[#001633] border border-[#2A3647] rounded-2xl p-3 lg:p-4">
                    {/* Preserve existing game component without modification */}
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      {rightTop}
                    </div>
                  </div>
                </Panel>
                <PanelResizeHandle className="h-2 my-2 cursor-row-resize rounded bg-[var(--color-border)]/20 hover:bg-[var(--color-border)]/40 transition-colors" />
                <Panel defaultSize={bottomPct} minSize={15} className="h-full">
                  <div className="h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4">
                    {rightBottom}
                  </div>
                </Panel>
              </PanelGroup>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}