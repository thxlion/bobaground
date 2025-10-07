import React from 'react';
import map from 'lodash/map';

interface ExploreCardDefinition {
  /**
   * Height of the card in pixels, mirroring the exact Figma measurements.
   */
  height: number;
  /**
   * Stable identifier for React list rendering and debugging.
   */
  id: string;
  /**
   * X coordinate (from the left edge) of the card within the canvas.
   */
  left: number;
  /**
   * Y coordinate (from the top edge) of the card within the canvas.
   */
  top: number;
  /**
   * Width of the card in pixels, matching the Figma frame.
   */
  width: number;
}

const exploreCardDefinitions: ExploreCardDefinition[] = [
  { height: 375, id: 'card-1', left: 0, top: 64, width: 375 },
  { height: 211, id: 'card-2', left: 379, top: 64, width: 375 },
  { height: 666, id: 'card-3', left: 758, top: 64, width: 375 },
  { height: 375, id: 'card-4', left: 1137, top: 64, width: 375 },
  { height: 375, id: 'card-5', left: 379, top: 279, width: 375 },
  { height: 211, id: 'card-6', left: 1137, top: 443, width: 375 },
  { height: 666, id: 'card-7', left: 0, top: 443, width: 375 },
  { height: 666, id: 'card-8', left: 379, top: 658, width: 375 },
  { height: 375, id: 'card-9', left: 758, top: 734, width: 375 },
  { height: 666, id: 'card-10', left: 1137, top: 658, width: 375 },
];

/**
 * ExploreGrid renders the Explore tab masonry exactly as laid out in Figma.
 * The design relies on absolute positioning, so we mirror each rectangle's
 * x/y coordinates and dimensions directly from the Figma frame (node 6527:17156).
 *
 * @returns React element containing the positioned Explore cards.
 */
export const ExploreGrid: React.FC = () => {
  return (
    <section
      aria-label="Explore curated canvases"
      className="relative mx-auto w-[1512px]"
      style={{ height: 1324 }}
    >
      {map(exploreCardDefinitions, ({ height, id, left, top, width }: ExploreCardDefinition) => (
        <article
          aria-hidden
          className="absolute rounded-[6px] border border-[#101012] bg-[#18181a]"
          key={id}
          style={{ height, left, top, width }}
        />
      ))}
    </section>
  );
};


