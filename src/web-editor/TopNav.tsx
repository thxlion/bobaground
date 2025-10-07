import React from 'react';
import { defaultEditorState } from './state';
import type { TabKey } from './state';

const imgFrame3148 = "http://localhost:3845/assets/77e253743565462a6ade4f55887fbb5cfd7a0155.svg";
const imgGroup2398 = "http://localhost:3845/assets/8171921e200b282145f3924ffb5eb89ada103fbc.svg";
const imgFrame2753 = "http://localhost:3845/assets/24bd89746cbd0c56630efe9676637957cc21030c.svg";
const imgGroup2631 = "http://localhost:3845/assets/807d4b73481f5bb0a129563cc0b2d5602d2a9564.svg";
const imgFrame2828 = "http://localhost:3845/assets/642b2d7e67bdb217c5093b9c179e1b5cce5d598c.svg";

/**
 * Top navigation bar, matching `Frame 3668` from Figma.
 * Left: segmented control (Explore, Image, Video)
 * Right: credits pill, bell icon, avatar placeholder.
 *
 * @returns React element describing the primary navigation for the editor.
 */
export const TopNav: React.FC = () => {
  const [active, setActive] = React.useState<TabKey>(defaultEditorState.activeTab);

  return (
    <div className="bg-[#101012] flex items-center justify-between px-[10px] py-[12px] h-16" role="navigation" aria-label="Primary">
      <div className="bg-black flex items-center gap-1 p-1 rounded-[6px]" role="tablist" aria-label="Modes">
        <button role="tab" aria-selected={active==='explore'} onClick={() => setActive('explore')} className="flex items-center gap-2 px-[10px] py-2 rounded-[3px] bg-[#18181a] text-white">
          <img alt="Explore" src={imgFrame3148} className="size-[18px]" />
          <span className="text-sm leading-5">Explore</span>
        </button>
        <button role="tab" aria-selected={active==='image'} onClick={() => setActive('image')} className="flex items-center gap-2 px-[10px] py-2 rounded-[3px] text-[#787879]">
          <span className="relative size-[18px]">
            <img alt="Image" src={imgGroup2398} className="size-full" />
          </span>
          <span className="text-sm leading-5">Image</span>
        </button>
        <button role="tab" aria-selected={active==='video'} onClick={() => setActive('video')} className="flex items-center gap-2 px-[10px] py-2 rounded-[3px] text-[#787879]">
          <img alt="Video" src={imgFrame2753} className="size-[18px]" />
          <span className="text-sm leading-5">Video</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-[#18181a] p-1 rounded-[6px]">
          <div className="flex items-center gap-2 px-[10px] py-2 rounded-[6px]">
            <span className="relative size-[18px]">
              <img alt="credits" src={imgGroup2631} className="size-full" />
            </span>
            <span className="text-sm leading-5 text-white">550 Credits</span>
          </div>
        </div>
        <div className="bg-[#18181a] p-1 rounded-[6px] size-[44px] flex items-center justify-center">
          <span className="size-[18px]">
            <img alt="bell" src={imgFrame2828} className="size-full" />
          </span>
        </div>
        <div className="bg-[#18181a] p-1 rounded-[6px] size-[44px] flex items-center justify-center">
          <span className="text-sm font-medium text-white">S</span>
        </div>
      </div>
    </div>
  );
};


