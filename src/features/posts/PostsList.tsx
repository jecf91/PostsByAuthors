import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { Post } from 'models/Post';

import PostAuthor from '../users/PostAuthor';
import ReactionSection from './ReactionSection';

import { convertDate } from '../../utilities/convertDate';

const PostItem = ({ post }: { post: Post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <PostAuthor userId={post.userId} />
      <p>posted at: {convertDate(post.date)}</p>
      <ReactionSection post={post} />
    </article>
  );
};

const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);

  return (
    <section>
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostsList;
