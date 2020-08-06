import { createAction, handleActions } from 'redux-actions';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';
const [
  VIEWER_UPDATE,
  VIEWER_UPDATE_SUCCESS,
  VIEWER_UPDATE_FAILURE,
] = 'post/VIEWER_UPDATE';
const [
  LIKEHEART_UPDATE,
  LIKEHEART_UPDATE_SUCCESS,
  LIKEHEART_UPDATE_FAILURE,
] = createRequestActionTypes('post/LIKEHEART_UPDATE');

export const readPost = createAction(READ_POST, (id) => id);
export const unloadPost = createAction(UNLOAD_POST);
export const viewerUpdate = createAction(
  VIEWER_UPDATE,
  ({ postId, viewer }) => ({
    postId,
    viewer,
  }),
);
export const likeheartUpdate = createAction(
  LIKEHEART_UPDATE,
  ({ postId, userId }) => ({ postId, userId }),
);

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
const viewerUpdateSaga = createRequestSaga(
  VIEWER_UPDATE,
  postsAPI.viewerUpdate,
);
const likeheartUpdateSaga = createRequestSaga(
  LIKEHEART_UPDATE,
  postsAPI.clickHeart,
);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(VIEWER_UPDATE, viewerUpdateSaga);
  yield takeLatest(LIKEHEART_UPDATE, likeheartUpdateSaga);
}

const initialState = {
  post: null,
  error: null,
  likePost: null,
  likeboolean: false,
  likePostNum: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: { like, post, likePostNum } }) => ({
      ...state,
      likeboolean: like,
      likePostNum,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
    [VIEWER_UPDATE_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [VIEWER_UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LIKEHEART_UPDATE_SUCCESS]: (
      state,
      { payload: { likePostNum, likeboolean } },
    ) => ({
      ...state,
      likePostNum,
      likeboolean,
    }),
    [LIKEHEART_UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default post;
