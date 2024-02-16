export interface IReaction {
  wow: number;
  heart: number;
  rocket: number;
  thumbsUp: number;
}

export type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
  date: string;
  reactions: IReaction;
};

export type ApiPost = {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | unknown;
};
