import React from 'react';
import { TopNav } from './TopNav';
import { BottomBar } from './BottomBar';

/**
 * App root layout that mirrors the canvas frame in Figma.
 * It composes a top navigation, a full-viewport dark canvas,
 * and a bottom prompt bar. The canvas is intentionally empty,
 * acting as a stage for future content.
 */
export const App: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col bg-zinc-950">
      <header className="h-16">
        <TopNav />
      </header>
      <main className="relative flex-1">
        {/* Canvas area */}
        <div className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[692px] px-4 sm:px-0">
          <BottomBar />
        </div>
      </main>
    </div>
  );
};


