import React from 'react';
import { BottomBar } from './BottomBar';
import { ExploreGrid } from './ExploreGrid';
import { TopNav } from './TopNav';

/**
 * App root layout that mirrors the canvas frame in Figma.
 * It composes the Explore navigation, renders the masonry grid,
 * and anchors the composer bottom bar on top of the canvas.
 *
 * @returns React element containing the full editor shell.
 */
export const App: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col bg-zinc-950">
      <header className="h-16">
        <TopNav />
      </header>
      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex justify-center">
          <ExploreGrid />
        </div>
        <div className="absolute bottom-8 left-1/2 w-full max-w-[692px] -translate-x-1/2 px-4 sm:px-0">
          <BottomBar />
        </div>
      </main>
    </div>
  );
};


