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

interface CommandItem {
  id: string;
  title: string;
  description: string;
}

const imgExploreInactive = "http://localhost:3845/assets/25b8bb39142b000c90f272d4c61fd536b62ad319.svg";
const imgImageInactive = "http://localhost:3845/assets/8171921e200b282145f3924ffb5eb89ada103fbc.svg";
const imgVideoInactive = "http://localhost:3845/assets/24bd89746cbd0c56630efe9676637957cc21030c.svg";
const imgExploreActive = "http://localhost:3845/assets/77e253743565462a6ade4f55887fbb5cfd7a0155.svg";
const imgImageActive = "http://localhost:3845/assets/e691ebffb0ee71221925fc2bcf63f0408ab79cc3.svg";
const imgVideoActive = "http://localhost:3845/assets/e3fe1bd7543b7b1752a5339075a756f61024a8c4.svg";
const imgGroup2631 = "http://localhost:3845/assets/807d4b73481f5bb0a129563cc0b2d5602d2a9564.svg";
const imgFrame2828 = "http://localhost:3845/assets/642b2d7e67bdb217c5093b9c179e1b5cce5d598c.svg";
const imgSearch = "http://localhost:3845/assets/9824c4ac0e1190f02ff570a4b18ad7eb281b49f7.svg";

const imageCommands: CommandItem[] = [
  {
    id: 'generate-image',
    title: 'Generate Image',
    description: 'Create detailed images from text prompts.',
  },
  {
    id: 'subject-reference',
    title: 'Subject Reference',
    description: 'Use an image to guide new generations.',
  },
  {
    id: 'upscale-image',
    title: 'Upscale Image',
    description: 'Enhance clarity and resolution.',
  },
  {
    id: 'apply-style',
    title: 'Apply Style',
    description: 'Transform visuals with custom styles.',
  },
  {
    id: 'generate-image-character',
    title: 'Generate Image with a Character',
    description: 'Build characters for reuse across scenes.',
  },
  {
    id: 'generate-image-character-style',
    title: 'Generate Image with Character + Style',
    description: 'Blend consistent characters with rich stylisation.',
  },
];

const videoCommands: CommandItem[] = [
  {
    id: 'generate-video-text',
    title: 'Generate Video from Text',
    description: 'Create motion from descriptive prompts.',
  },
  {
    id: 'generate-video-style',
    title: 'Generate Video from Text + Style',
    description: 'Apply a visual style to new clips.',
  },
  {
    id: 'generate-video-image',
    title: 'Generate Video from Image',
    description: 'Animate a still into a moving scene.',
  },
  {
    id: 'first-last-frames',
    title: 'First & Last Frames',
    description: 'Craft bookended shots for story flow.',
  },
  {
    id: 'generate-video-voice',
    title: 'Generate Video with Voice',
    description: 'Sync character dialogue effortlessly.',
  },
  {
    id: 'generate-video-vfx',
    title: 'Generate Video with Visual Effect',
    description: 'Layer cinematic treatments onto footage.',
  },
  {
    id: 'generate-video-vfx-character',
    title: 'Generate Video with Visual Effect + Character',
    description: 'Combine hero performances with effects.',
  },
  {
    id: 'upscale-video',
    title: 'Upscale Video',
    description: 'Increase resolution while preserving detail.',
  },
  {
    id: 'extend-video',
    title: 'Extend Video',
    description: 'Lengthen shots without re-shooting.',
  },
];

const FLYOUT_OFFSET = 12;

type FlyoutTab = 'image' | 'video';

/**
 * Top navigation bar, matching `Frame 3668` from Figma.
 * Left: segmented control (Explore, Image, Video)
 * Right: credits pill, bell icon, avatar placeholder.
 * Hovering Image/Video surfaces a searchable command flyout.
 *
 * @param param0 Active tab selection and change handler supplied by parent.
 * @returns React element describing the primary navigation for the editor.
 */
export const TopNav: React.FC<TopNavProps> = ({ activeTab, onTabChange }: TopNavProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageButtonRef = React.useRef<HTMLButtonElement>(null);
  const videoButtonRef = React.useRef<HTMLButtonElement>(null);

  const [flyoutTab, setFlyoutTab] = React.useState<FlyoutTab | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [hoveredCommandId, setHoveredCommandId] = React.useState<string | undefined>();
  const [flyoutPosition, setFlyoutPosition] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 });

  const commands = React.useMemo<CommandItem[]>(() => {
    if (flyoutTab === 'image') {
      return imageCommands;
    }
    if (flyoutTab === 'video') {
      return videoCommands;
    }
    return [];
  }, [flyoutTab]);

  const filteredCommands = React.useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return commands;
    }
    return commands.filter(({ title, description }) =>
      title.toLowerCase().includes(trimmed) || description.toLowerCase().includes(trimmed),
    );
  }, [commands, searchQuery]);

  /**
   * Active command is determined solely by hover state.
   * We do not auto-select the first element in the list.
   */
  const activeCommandId = React.useMemo(() => {
    return hoveredCommandId;
  }, [hoveredCommandId]);

  const updateFlyoutPosition = React.useCallback(() => {
    if (!flyoutTab) {
      return;
    }
    const buttonElement = flyoutTab === 'image' ? imageButtonRef.current : videoButtonRef.current;
    const containerElement = containerRef.current;
    if (!buttonElement || !containerElement) {
      return;
    }
    const buttonRect = buttonElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    setFlyoutPosition({
      left: buttonRect.left - containerRect.left,
      top: buttonRect.bottom - containerRect.top + FLYOUT_OFFSET,
    });
  }, [flyoutTab]);

  React.useLayoutEffect(() => {
    if (!flyoutTab) {
      return undefined;
    }
    updateFlyoutPosition();
    window.addEventListener('resize', updateFlyoutPosition);
    return () => {
      window.removeEventListener('resize', updateFlyoutPosition);
    };
  }, [flyoutTab, updateFlyoutPosition]);

  const handleOpenFlyout = (tab: FlyoutTab) => {
    setFlyoutTab(tab);
    setSearchQuery('');
    setHoveredCommandId(undefined);
  };

  const handleCloseFlyout = () => {
    setFlyoutTab(undefined);
    setHoveredCommandId(undefined);
  };

  const handleNavigationMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    const isMovingToFlyout = nextTarget && document.querySelector('[data-flyout-menu]')?.contains(nextTarget);
    if (!isMovingToFlyout && (!nextTarget || !containerRef.current?.contains(nextTarget))) {
      handleCloseFlyout();
    }
  };

  const handleFlyoutMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !containerRef.current?.contains(nextTarget)) {
      handleCloseFlyout();
    }
  };

  const handleCommandClick = (command: CommandItem) => {
    console.info(`Command triggered: ${command.title}`);
    handleCloseFlyout();
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
    <div className="relative" ref={containerRef}>
      <div
        className="flex items-center justify-between px-[10px] py-[12px] h-16"
        role="navigation"
        aria-label="Primary"
        onMouseLeave={handleNavigationMouseLeave}
      >
        <div className="bg-black flex items-center gap-1 p-1 rounded-[6px]" role="tablist" aria-label="Modes">
          <button
            role="tab"
            aria-selected={activeTab==='explore'}
            onClick={() => {
              handleCloseFlyout();
              onTabChange('explore');
            }}
            onMouseEnter={handleCloseFlyout}
            onFocus={handleCloseFlyout}
            className={`flex items-center gap-2 px-[10px] py-2 rounded-[3px] transition-colors ${activeTab==='explore' ? 'bg-[#18181a] text-white' : 'bg-transparent text-[#787879]'}`}
          >
            <img alt="Explore" src={resolveIcon('explore')} className="size-[18px]" />
            <span className="text-sm leading-5">Explore</span>
          </button>
          <button
            ref={imageButtonRef}
            role="tab"
            aria-selected={activeTab==='image'}
            onClick={() => onTabChange('image')}
            onMouseEnter={() => handleOpenFlyout('image')}
            onFocus={() => handleOpenFlyout('image')}
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
            ref={videoButtonRef}
            onClick={() => onTabChange('video')}
            onMouseEnter={() => handleOpenFlyout('video')}
            onFocus={() => handleOpenFlyout('video')}
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

        {flyoutTab ? (
        <div
          data-flyout-menu
          className="absolute z-30 w-[360px] rounded-[12px] border bg-[#151517] backdrop-blur-2xl p-1"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: '0px 24px 60px rgba(0, 0, 0, 0.45)',
            left: flyoutPosition.left,
            top: flyoutPosition.top,
          }}
          onMouseEnter={() => updateFlyoutPosition()}
          onMouseLeave={handleFlyoutMouseLeave}
        >
          <div className="relative flex items-center gap-2 w-[352px] h-12 pt-[14px] pb-[14px] pl-3 pr-[14px]">
            <div className="relative shrink-0 size-[18px]">
              <img alt="Search" src={imgSearch} className="w-[18px] h-[23.8px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[315deg] opacity-70" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search ..."
              className="flex-1 bg-transparent text-sm text-white placeholder-[#787879] outline-none"
            />
          </div>
          <div className="flex flex-col overflow-y-auto">
            {filteredCommands.map((command) => {
              const isActive = command.id === activeCommandId;
              return (
                <button
                  key={command.id}
                  type="button"
                  onMouseEnter={() => setHoveredCommandId(command.id)}
                  onMouseLeave={() => setHoveredCommandId(undefined)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleCommandClick(command)}
                  className={`flex max-w-[352px] h-[54px] items-center gap-3 rounded-[6px] px-3 py-[10px] text-left transition-colors ${isActive ? 'bg-[#1e1e20]' : 'bg-transparent hover:bg-[#1e1e20]/50'}`}
                >
                  <span className="bg-black rounded-[4px] size-8 shrink-0" aria-hidden="true" />
                  <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                    <span className="text-[12px] leading-[16px] font-medium text-white truncate">{command.title}</span>
                    <span className="text-[12px] leading-[16px] text-[#787879] truncate">{command.description}</span>
                  </div>
                </button>
              );
            })}
            {filteredCommands.length === 0 ? (
              <div className="w-[352px] h-[54px] rounded-[6px] px-3 py-[10px] flex items-center justify-center text-xs text-[#787879]">
                No matches. Try another search.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};


