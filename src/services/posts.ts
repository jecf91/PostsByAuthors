import axios from 'axios';

import { POSTS_URL } from '../constants';
import { Post } from '../models/Post';

export const getAllPosts = async () => {
  const response = await axios.get(POSTS_URL);
  return [...response.data] as Post[];
};
