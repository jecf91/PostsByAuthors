import { useSelector } from 'react-redux';

import { selectAllUsers } from './usersSlice';

const PostAuthor = ({ userId }: { userId: string }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);

  return <span>Quote by: {author ? author.name : 'Unknow author'}</span>;
};

export default PostAuthor;
