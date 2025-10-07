import React from 'react';

const imgGroup2621 = "http://localhost:3845/assets/716d6c4f493a18fefdb34b9b9b5d1fe7bfd75977.svg";
const imgGroup2622 = "http://localhost:3845/assets/86701b3b7e0a8f8c766d74d025088df38fdd92c5.svg";
const imgGroup2404 = "http://localhost:3845/assets/93f26d76543660da94faf106ea3ba4b2f6e7696b.svg";
const imgFrame12 = "http://localhost:3845/assets/043f387103824dc31f52264c5ffbec699dfbd814.svg";

type Ratio = '16:9' | '1:1' | '9:16' | '4:3' | '3:2';

/**
 * Bottom prompt bar matching `Frame 4039` from Figma.
 * Contains a textarea hint, three compact controls, and a send button.
 */
export const BottomBar: React.FC = () => {
  const [ratio, setRatio] = React.useState<Ratio>('16:9');
  const [count, setCount] = React.useState<number>(2);

  return (
    <div className="bg-[#151517] border border-subtle rounded-xl w-full shadow-md">
      <div className="rounded-xl overflow-hidden">
        <div className="h-20 px-5 py-4 flex items-start">
          <p className="text-sm text-[#787879]">Describe your image ...</p>
        </div>
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="bg-[#1e1e20] rounded px-[14px] py-3 flex items-center gap-2 text-sm">
              <span className="relative size-[18px]">
                {/* double chevrons */}
                <span className="absolute left-[2.7px] top-[2.7px] w-[12.6px] h-[5.4px]">
                  <img alt="" src={imgGroup2621} className="w-full h-full" />
                </span>
                <span className="absolute left-[2.7px] top-[9.9px] w-[12.6px] h-[5.4px]">
                  <img alt="" src={imgGroup2622} className="w-full h-full rotate-180 -scale-y-100" />
                </span>
              </span>
              <span className="text-white">Text to Image</span>
            </button>
            <button className="bg-[#1e1e20] rounded px-3 py-3 flex items-center gap-2 text-sm" onClick={() => setRatio(ratio)}>
              <span className="relative size-[18px]">
                <span className="absolute left-[1.75px] top-1/2 -translate-y-1/2 w-[14.4px] h-[14.4px]">
                  <img alt="ratio" src={imgGroup2404} className="w-full h-full" />
                </span>
              </span>
              <span className="text-white">{ratio}</span>
            </button>
            <button className="bg-[#1e1e20] rounded px-3 py-3 flex items-center gap-2 text-sm" onClick={() => setCount((c) => Math.max(1, Math.min(8, c + 1)))}>
              <span className="relative size-[18px]">
                <span className="absolute left-[1.8px] top-[1.8px] w-[14.4px] h-[14.4px]">
                  {/* grid dots approximated with border circles */}
                  <span className="absolute left-[10.14px] top-[10.14px] w-[6.063px] h-[6.063px] rounded-[9.6px] bg-white border border-white" />
                  <span className="absolute left-[10.14px] top-[1.8px] w-[6.063px] h-[6.063px] rounded-[9.6px] border border-white" />
                  <span className="absolute left-[1.8px] top-[1.8px] w-[6.063px] h-[6.063px] rounded-[9.6px] border border-white" />
                  <span className="absolute left-[1.8px] top-[10.14px] w-[6.063px] h-[6.063px] rounded-[9.6px] bg-white border border-white" />
                </span>
              </span>
              <span className="text-white">{count}</span>
            </button>
          </div>
          <button className="bg-[#1e1e20] rounded w-11 h-11 flex items-center justify-center">
            <img alt="send" src={imgFrame12} className="size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};


