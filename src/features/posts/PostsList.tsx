import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from 'store';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from './postsSlice';

import PostAuthor from '../users/PostAuthor';
import ReactionSection from './ReactionSection';

import { convertDate } from '../../utilities/convertDate';

import { Post } from 'models/Post';

const PostItem = ({ post }: { post: Post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}...</p>
      <PostAuthor userId={post.userId} />
      <p>posted at: {convertDate(post.date)}</p>
      <ReactionSection post={post} />
    </article>
  );
};

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);
  const status = useSelector(getPostsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, fetchPosts]);

  if (status === 'loading') {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <section>
        <p>Something went wrong</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Posts</h2>
      {React.Children.toArray(posts.map((post) => <PostItem post={post} />))}
    </section>
  );
};

export default PostsList;
