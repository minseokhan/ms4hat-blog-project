import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import tags, { tagsSaga } from './tags';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  tags,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    tagsSaga(),
  ]);
}

export default rootReducer;
