import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
const posts = new Router();

posts.get('/', postsCtrl.list);
posts.get('/recent', postsCtrl.recent);
posts.post('/like/:postId/:userId', postsCtrl.likeHeart);
posts.post('/', checkLoggedIn, postsCtrl.write);
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.patch('/view/:id', postsCtrl.getPostById, postsCtrl.viewer);
posts.delete(
  '/:id',
  postsCtrl.getPostById,
  checkLoggedIn,
  postsCtrl.checkOwnPost,
  postsCtrl.remove,
);
posts.patch(
  '/:id',
  postsCtrl.getPostById,
  checkLoggedIn,
  postsCtrl.checkOwnPost,
  postsCtrl.update,
);
export default posts;
