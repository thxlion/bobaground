import React from 'react';

const imgDoubleChevronTop = "http://localhost:3845/assets/716d6c4f493a18fefdb34b9b9b5d1fe7bfd75977.svg";
const imgDoubleChevronBottom = "http://localhost:3845/assets/86701b3b7e0a8f8c766d74d025088df38fdd92c5.svg";
const imgAspect = "http://localhost:3845/assets/93f26d76543660da94faf106ea3ba4b2f6e7696b.svg";
const imgResolution = "http://localhost:3845/assets/615bc918d3ee5af122e68604561c902af6e8ff7c.svg";
const imgDuration = "http://localhost:3845/assets/3f2e7f05d127c6ba20262df964efa88da9f96a06.svg";
const imgSend = "http://localhost:3845/assets/043f387103824dc31f52264c5ffbec699dfbd814.svg";

type Ratio = '16:9' | '1:1' | '9:16' | '4:3' | '3:2';
type Resolution = '720p' | '1080p' | '4K';
type Duration = '5s' | '10s' | '30s';

interface BottomBarProps {
  /**
   * Current active tab, used to determine which controls to surface.
   */
  activeTab: 'image' | 'video';
}

/**
 * Bottom prompt bar matching the Image and Video prompt variations from Figma.
 * The control cluster adapts based on the active mode to surface the proper affordances.
 *
 * @param param0 Active tab (image or video) controlling the prompt configuration.
 * @returns Prompt composer element adhering to the design spec.
 */
export const BottomBar: React.FC<BottomBarProps> = ({ activeTab }: BottomBarProps) => {
  const ratioOptions: readonly Ratio[] = ['16:9', '1:1', '9:16', '4:3', '3:2'] as const;
  const resolutionOptions: readonly Resolution[] = ['720p', '1080p', '4K'] as const;
  const durationOptions: readonly Duration[] = ['5s', '10s', '30s'] as const;

  const [ratio, setRatio] = React.useState<Ratio>(ratioOptions[0] ?? '16:9');
  const [count, setCount] = React.useState<number>(2);
  const [resolution, setResolution] = React.useState<Resolution>(resolutionOptions[0] ?? '720p');
  const [duration, setDuration] = React.useState<Duration>(durationOptions[0] ?? '5s');

  const isVideo = activeTab === 'video';
  const promptPlaceholder = isVideo ? 'Describe your video ...' : 'Describe your image ...';
  const modeLabel = isVideo ? 'Text to Video' : 'Text to Image';

  const cycleValue = <Value extends string>(current: Value, values: readonly Value[]): Value => {
    if (values.length === 0) {
      return current;
    }
    const index = values.findIndex((option) => option === current);
    const safeIndex = index === -1 ? 0 : index;
    const nextIndex = (safeIndex + 1) % values.length;
    const nextValue = values[nextIndex];
    if (nextValue !== undefined) {
      return nextValue as Value;
    }
    return values[0] as Value;
  };

  const handleRatioCycle = (): void => {
    setRatio((current) => cycleValue<Ratio>(current, ratioOptions));
  };

  const handleResolutionCycle = (): void => {
    setResolution((current) => cycleValue<Resolution>(current, resolutionOptions));
  };

  const handleDurationCycle = (): void => {
    setDuration((current) => cycleValue<Duration>(current, durationOptions));
  };

  const handleCountCycle = (): void => {
    setCount((current) => {
      const next = current >= 8 ? 1 : current + 1;
      return next;
    });
  };

  return (
    <div className="bg-[#151517] border border-subtle rounded-xl w-full shadow-md">
      <div className="rounded-xl overflow-hidden">
        <div className="h-20 px-5 py-4 flex items-start">
          <p className="text-sm text-[#787879]">{promptPlaceholder}</p>
        </div>
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button type="button" className="bg-[#1e1e20] rounded px-[14px] py-3 flex items-center gap-2 text-sm">
              <span className="relative size-[18px]">
                <span className="absolute left-[2.7px] top-[2.7px] w-[12.6px] h-[5.4px]">
                  <img alt="mode upper chevron" src={imgDoubleChevronTop} className="w-full h-full" />
                </span>
                <span className="absolute left-[2.7px] top-[9.9px] w-[12.6px] h-[5.4px]">
                  <img alt="mode lower chevron" src={imgDoubleChevronBottom} className="w-full h-full rotate-180 -scale-y-100" />
                </span>
              </span>
              <span className="text-white">{modeLabel}</span>
            </button>
            <button type="button" className="bg-[#1e1e20] rounded px-3 py-3 flex items-center gap-2 text-sm" onClick={handleRatioCycle}>
              <span className="relative size-[18px]">
                <span className="absolute left-[1.75px] top-1/2 -translate-y-1/2 w-[14.4px] h-[14.4px]">
                  <img alt="aspect" src={imgAspect} className="w-full h-full" />
                </span>
              </span>
              <span className="text-white">{ratio}</span>
            </button>
            {isVideo ? (
              <button type="button" className="bg-[#1e1e20] rounded px-3 py-3 flex items-center gap-2 text-sm" onClick={handleResolutionCycle}>
                <span className="relative size-[18px]">
                  <span className="absolute left-[2.25px] top-[3.83px] w-[13.5px] h-[10.352px]">
                    <img alt="resolution" src={imgResolution} className="w-full h-full" />
                  </span>
                </span>
                <span className="text-white">{resolution}</span>
              </button>
            ) : null}
            <button type="button" className="bg-[#1e1e20] rounded px-3 py-3 flex items-center gap-2 text-sm" onClick={handleCountCycle}>
              <span className="relative size-[18px]">
                <span className="absolute left-[1.8px] top-[1.8px] w-[14.4px] h-[14.4px]">
                  <span className="absolute left-[10.14px] top-[10.14px] w-[6.063px] h-[6.063px] rounded-[9.6px] bg-white border border-white" />
                  <span className="absolute left-[10.14px] top-[1.8px] w-[6.063px] h-[6.063px] rounded-[9.6px] border border-white" />
                  <span className="absolute left-[1.8px] top-[1.8px] w-[6.063px] h-[6.063px] rounded-[9.6px] border border-white" />
                  <span className="absolute left-[1.8px] top-[10.14px] w-[6.063px] h-[6.063px] rounded-[9.6px] bg-white border border-white" />
                </span>
              </span>
              <span className="text-white">{count}</span>
            </button>
            {isVideo ? (
              <button type="button" className="bg-[#1e1e20] rounded px-3 py-3 flex items-center gap-2 text-sm" onClick={handleDurationCycle}>
                <span className="relative size-[18px]">
                  <span className="absolute left-[0.8px] top-[1.88px] w-[16.199px] h-[14.625px]">
                    <img alt="duration" src={imgDuration} className="w-full h-full" />
                  </span>
                </span>
                <span className="text-white">{duration}</span>
              </button>
            ) : null}
          </div>
          <button type="button" className="bg-[#1e1e20] rounded w-11 h-11 flex items-center justify-center">
            <img alt="send" src={imgSend} className="size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};


