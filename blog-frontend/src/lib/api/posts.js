import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags, imageUrl }) =>
  client.post('/api/posts', { title, body, tags, imageUrl });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const viewerUpdate = ({ postId, viewer }) =>
  client.patch(`/api/posts/view/${postId}`, {
    viewer: viewer + 1,
  });

export const clickHeart = ({ postId, userId }) =>
  client.post(`/api/posts/like/${postId}/${userId}`);

export const listPosts = ({ username, page, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, tags, imageUrl }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
    imageUrl,
  });

export const removePost = (id) => client.delete(`/api/posts/${id}`);

export const recentList = () => client.get('/api/posts/recent');
