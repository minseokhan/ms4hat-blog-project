import client from './client';

export const listTags = () => client.get('/api/tags');
