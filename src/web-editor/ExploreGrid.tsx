import React from 'react';
import map from 'lodash/map';

const BASE_COLUMN_WIDTH = 375;
const BASE_COLUMN_GAP = 4;
const BASE_TOP_OFFSET = 0;
const COLUMN_COUNT = 4;
const MAX_PAGES = 20;

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
  { height: 375, id: 'card-1', left: 0, top: 0, width: 375 },
  { height: 211, id: 'card-2', left: 379, top: 0, width: 375 },
  { height: 666, id: 'card-3', left: 758, top: 0, width: 375 },
  { height: 375, id: 'card-4', left: 1137, top: 0, width: 375 },
  { height: 375, id: 'card-5', left: 379, top: 215, width: 375 },
  { height: 211, id: 'card-6', left: 1137, top: 447, width: 375 },
  { height: 666, id: 'card-7', left: 0, top: 379, width: 375 },
  { height: 666, id: 'card-8', left: 379, top: 662, width: 375 },
  { height: 375, id: 'card-9', left: 758, top: 738, width: 375 },
  { height: 666, id: 'card-10', left: 1137, top: 662, width: 375 },
];

interface LayoutCard {
  height: number;
  key: string;
  left: number;
  top: number;
  width: number;
}

/**
 * ExploreGrid renders the Explore tab masonry exactly as laid out in Figma.
 * We keep the absolute layout but scale it proportionally with the viewport width
 * so that cards match the design on any screen size while retaining their ratios.
 *
 * @returns React element containing the positioned Explore cards.
 */
export const ExploreGrid: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const isFetchingRef = React.useRef<boolean>(false);
  const [pageCount, setPageCount] = React.useState<number>(3);
  const [containerWidth, setContainerWidth] = React.useState<number>(BASE_COLUMN_WIDTH * COLUMN_COUNT + BASE_COLUMN_GAP * (COLUMN_COUNT - 1));

  React.useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const updateDimensions = (width: number): void => {
      setContainerWidth(width);
    };

    updateDimensions(node.clientWidth);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      updateDimensions(entry.contentRect.width);
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    isFetchingRef.current = false;
  }, [pageCount]);

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return undefined;
    }

    const scrollRoot = document.querySelector('[data-explore-scroll-root]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || isFetchingRef.current) {
            return;
          }
          isFetchingRef.current = true;
          setPageCount((current) => (current < MAX_PAGES ? current + 1 : current));
        });
      },
      {
        root: (scrollRoot as Element) ?? null,
        rootMargin: '0px 0px 600px 0px',
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const columnWidth = React.useMemo(() => {
    const totalGap = BASE_COLUMN_GAP * (COLUMN_COUNT - 1);
    const widthWithoutGaps = Math.max(containerWidth - totalGap, COLUMN_COUNT * 10);
    return widthWithoutGaps / COLUMN_COUNT;
  }, [containerWidth]);

  const scale = React.useMemo(() => columnWidth / BASE_COLUMN_WIDTH, [columnWidth]);

  const layout = React.useMemo(() => {
    if (!Number.isFinite(columnWidth) || columnWidth <= 0) {
      return { cards: [], height: 0 };
    }

    const columnOffsets: number[] = new Array<number>(COLUMN_COUNT).fill(BASE_TOP_OFFSET);

    const cards: LayoutCard[] = [];

    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      map(exploreCardDefinitions, ({ height, id, left }: ExploreCardDefinition) => {
        const columnIndex = Math.min(
          COLUMN_COUNT - 1,
          Math.max(0, Math.round(left / (BASE_COLUMN_WIDTH + BASE_COLUMN_GAP))),
        );

        const cardHeight = height * scale;
        const cardLeft = columnIndex * (columnWidth + BASE_COLUMN_GAP);
        const cardTop = columnOffsets[columnIndex] ?? BASE_TOP_OFFSET;

        cards.push({
          height: cardHeight,
          key: `${pageIndex}-${id}`,
          left: cardLeft,
          top: cardTop,
          width: columnWidth,
        });

        columnOffsets[columnIndex] = cardTop + cardHeight + BASE_COLUMN_GAP;
      });
    }

    const tallestColumn = columnOffsets.reduce((tallest, offset) => Math.max(tallest, offset), BASE_TOP_OFFSET);

    return { cards, height: tallestColumn };
  }, [columnWidth, pageCount, scale]);

  return (
    <section aria-label="Explore curated canvases" className="flex h-full w-full">
      <div
        className="relative h-full w-full bg-[#101012]"
        ref={containerRef}
        style={{ minHeight: layout.height }}
      >
        {map(layout.cards, ({ height, key, left, top, width }: LayoutCard) => (
          <article
            aria-hidden
            className="absolute bg-[#18181a]"
            key={key}
            style={{ height, left, top, width }}
          />
        ))}
        <div
          aria-hidden
          ref={sentinelRef}
          style={{ height: 1, left: 0, position: 'absolute', top: layout.height + 1, width: '1px' }}
        />
      </div>
    </section>
  );
};


