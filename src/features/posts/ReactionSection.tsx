import { useDispatch } from 'react-redux';

import { addReaction } from './postsSlice';

import { Post, IReaction } from '../../models/Post';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
};

const ReactionSection = ({ post }: { post: Post }) => {
  const dispatch = useDispatch();

  return Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() =>
        dispatch(
          addReaction({ id: post.id, reaction: name as keyof IReaction })
        )
      }
    >
      {emoji} {post.reactions[name as keyof IReaction]}
    </button>
  ));
};

export default ReactionSection;
