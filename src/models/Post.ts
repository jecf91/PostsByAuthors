export interface IReaction {
  wow: number;
  heart: number;
  rocket: number;
  thumbsUp: number;
}

export type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: IReaction;
};
