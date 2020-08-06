import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import files from './files';
import tags from './tags';
const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/files', files.routes());
api.use('/tags', tags.routes());

export default api;
