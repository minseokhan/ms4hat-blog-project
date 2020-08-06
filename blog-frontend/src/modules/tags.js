import { createAction, handleActions } from 'redux-actions';
import * as tagsAPI from '../lib/api/tags';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [
  LIST_TAGS,
  LIST_TAGS_SUCCESS,
  LIST_TAGS_FAILURE,
] = createRequestActionTypes('tags/LIST_TAGS');

export const listTags = createAction(LIST_TAGS);

const listTagsSaga = createRequestSaga(LIST_TAGS, tagsAPI.listTags);
export function* tagsSaga() {
  yield takeLatest(LIST_TAGS, listTagsSaga);
}

const initialState = {
  tagList: null,
  error: null,
};

const tags = handleActions(
  {
    [LIST_TAGS_SUCCESS]: (state, { payload: tagList }) => ({
      ...state,
      tagList,
    }),
    [LIST_TAGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default tags;
