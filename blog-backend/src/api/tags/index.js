import Router from 'koa-router';
import * as tagsCtrl from './tags.ctrl';
const tags = new Router();

tags.get('/', tagsCtrl.list);
export default tags;
