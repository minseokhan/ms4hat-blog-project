import { createAction, handleActions } from 'redux-actions';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

const [
  RECENT_POSTS,
  RECENT_POSTS_SUCCESS,
  RECENT_POSTS_FAILURE,
] = createRequestActionTypes('posts/RECENT_POSTS');

export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({ tag, username, page }),
);

export const recentPosts = createAction(RECENT_POSTS);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
const recentPostsSaga = createRequestSaga(RECENT_POSTS, postsAPI.recentList);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
  yield takeLatest(RECENT_POSTS, recentPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
  recentList: null,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [RECENT_POSTS_SUCCESS]: (state, { payload: recentList }) => ({
      ...state,
      recentList,
    }),
    [RECENT_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default posts;
