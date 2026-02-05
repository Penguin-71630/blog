// Types

// Creators
export { FriendCreator } from './friend-creator';
export { PostCreator } from './post-creator';
export type { CategoryTreeItem, ContentCreator, CreatorProps, FriendData, PostData } from './types';

import { FriendCreator } from './friend-creator';
import { PostCreator } from './post-creator';
// Creator registry
import type { ContentCreator } from './types';

export const CREATORS: ContentCreator[] = [
  {
    id: 'post',
    label: '部落格文章',
    description: '創建新的部落格文章',
    Component: PostCreator,
  },
  {
    id: 'friend',
    label: '友站網址',
    description: '添加新的友站網址',
    Component: FriendCreator,
  },
];

export type CreatorType = (typeof CREATORS)[number]['id'];
