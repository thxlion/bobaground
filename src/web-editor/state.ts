export type TabKey = 'explore' | 'image' | 'video';

export interface EditorState {
  activeTab: TabKey;
  aspectRatio: string;
  imageCount: number;
}

export const defaultEditorState: EditorState = {
  activeTab: 'image',
  aspectRatio: '16:9',
  imageCount: 2,
};


