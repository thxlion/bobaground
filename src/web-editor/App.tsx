import React from 'react';
import { BottomBar } from './BottomBar';
import { ExploreGrid } from './ExploreGrid';
import { TopNav } from './TopNav';
import { defaultEditorState } from './state';
import type { TabKey } from './state';

/**
 * App root layout that mirrors the canvas frame in Figma.
 * It composes the Explore navigation, renders the masonry grid,
 * and anchors the composer bottom bar on top of the canvas.
 *
 * @returns React element containing the full editor shell.
 */
export const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabKey>(defaultEditorState.activeTab);

  const shouldShowBottomBar = activeTab !== 'explore';

  return (
    <div className="min-h-full flex flex-col bg-zinc-950">
      <header className="sticky top-0 z-20 h-16 bg-zinc-950/95 backdrop-blur">
        <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      </header>
      <main className="relative flex-1 overflow-hidden" data-explore-scroll-root>
        <div className="absolute inset-0 flex justify-center overflow-y-auto">
          {activeTab === 'explore' ? <ExploreGrid /> : <div className="w-full" />}
        </div>
        {shouldShowBottomBar ? (
          <div className="absolute bottom-8 left-1/2 w-full max-w-[692px] -translate-x-1/2 px-4 sm:px-0">
            <BottomBar activeTab={activeTab === 'video' ? 'video' : 'image'} />
          </div>
        ) : null}
      </main>
    </div>
  );
};


