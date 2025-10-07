import React from 'react';
import type { TabKey } from './state';

interface TopNavProps {
  /**
   * Currently selected tab within the editor shell.
   */
  activeTab: TabKey;
  /**
   * Callback fired when a tab is pressed, allowing the parent to manage state.
   */
  onTabChange: (tab: TabKey) => void;
}

const imgExploreInactive = "http://localhost:3845/assets/77e253743565462a6ade4f55887fbb5cfd7a0155.svg";
const imgImageInactive = "http://localhost:3845/assets/8171921e200b282145f3924ffb5eb89ada103fbc.svg";
const imgVideoInactive = "http://localhost:3845/assets/24bd89746cbd0c56630efe9676637957cc21030c.svg";
const imgExploreActive = "http://localhost:3845/assets/25b8bb39142b000c90f272d4c61fd536b62ad319.svg";
const imgImageActive = "http://localhost:3845/assets/e691ebffb0ee71221925fc2bcf63f0408ab79cc3.svg";
const imgVideoActive = "http://localhost:3845/assets/e3fe1bd7543b7b1752a5339075a756f61024a8c4.svg";
const imgGroup2631 = "http://localhost:3845/assets/807d4b73481f5bb0a129563cc0b2d5602d2a9564.svg";
const imgFrame2828 = "http://localhost:3845/assets/642b2d7e67bdb217c5093b9c179e1b5cce5d598c.svg";

/**
 * Top navigation bar, matching `Frame 3668` from Figma.
 * Left: segmented control (Explore, Image, Video)
 * Right: credits pill, bell icon, avatar placeholder.
 *
 * @param param0 Active tab selection and change handler supplied by parent.
 * @returns React element describing the primary navigation for the editor.
 */
export const TopNav: React.FC<TopNavProps> = ({ activeTab, onTabChange }: TopNavProps) => {
  const handleTabPress = (tab: TabKey): void => {
    onTabChange(tab);
  };

  const resolveIcon = (tab: TabKey): string => {
    if (tab === 'explore') {
      return activeTab === 'explore' ? imgExploreActive : imgExploreInactive;
    }
    if (tab === 'image') {
      return activeTab === 'image' ? imgImageActive : imgImageInactive;
    }
    return activeTab === 'video' ? imgVideoActive : imgVideoInactive;
  };

  return (
    <div className="flex items-center justify-between px-[10px] py-[12px] h-16" role="navigation" aria-label="Primary">
      <div className="bg-black flex items-center gap-1 p-1 rounded-[6px]" role="tablist" aria-label="Modes">
        <button
          role="tab"
          aria-selected={activeTab==='explore'}
          onClick={() => handleTabPress('explore')}
          className={`flex items-center gap-2 px-[10px] py-2 rounded-[3px] transition-colors ${activeTab==='explore' ? 'bg-[#18181a] text-white' : 'bg-transparent text-[#787879]'}`}
        >
          <img alt="Explore" src={resolveIcon('explore')} className="size-[18px]" />
          <span className="text-sm leading-5">Explore</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab==='image'}
          onClick={() => handleTabPress('image')}
          className={`flex items-center gap-2 px-[10px] py-2 rounded-[3px] transition-colors ${activeTab==='image' ? 'bg-[#18181a] text-white' : 'bg-transparent text-[#787879]'}`}
        >
          <span className="relative size-[18px]">
            <img alt="Image" src={resolveIcon('image')} className="size-full" />
          </span>
          <span className="text-sm leading-5">Image</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab==='video'}
          onClick={() => handleTabPress('video')}
          className={`flex items-center gap-2 px-[10px] py-2 rounded-[3px] transition-colors ${activeTab==='video' ? 'bg-[#18181a] text-white' : 'bg-transparent text-[#787879]'}`}
        >
          <img alt="Video" src={resolveIcon('video')} className="size-[18px]" />
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


