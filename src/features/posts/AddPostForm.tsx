import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

import { User } from '../../models/User';

const OptionsList = ({ author }: { author: User }) => (
  <option value={author.id}>{author.name}</option>
);

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const authors = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const canSavePost = Boolean(title) && Boolean(content) && Boolean(userId);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleAuthorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(e.target.value);
  }

  function handlePostSubmit() {
    if (canSavePost) {
      dispatch(addPost({ title, content, userId }));
      setTitle('');
      setContent('');
      setUserId('');
      return;
    }
    alert('Something went wrong please check your data');
    return;
  }

  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={handleAuthorChange}
        >
          <option value={''}>Please select an Author</option>
          {authors.map((author) => (
            <OptionsList key={author.id} author={author} />
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button
          disabled={!canSavePost}
          type="button"
          onClick={handlePostSubmit}
        >
          Submit Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
