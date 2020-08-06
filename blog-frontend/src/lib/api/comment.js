import client from './client';

export const writeComment = ({ comment }) =>
  client.post('/api/comment/write', { comment });
