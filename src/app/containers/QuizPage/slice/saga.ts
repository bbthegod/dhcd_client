/*
 *
 * QuizPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as snackbarActions } from 'app/containers/Dashboard/slice';
import { request } from 'utils/request';
import { actions } from '.';

export function* get() {
  try {
    const { response } = yield call(request, {
      url: '/play/continue',
      method: 'GET',
    });
    if (response) {
      yield put(actions.getSuccess(response));
    } else {
      yield put(actions.getFailure());
    }
  } catch (err) {
    yield put(actions.getFailure());
  }
}

export function* end() {
  try {
    const { response } = yield call(request, {
      url: '/play/end',
      method: 'GET',
    });
    if (response) {
      yield put(actions.endSuccess(response));
    } else {
      yield put(actions.endFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Thao tác thất bại!',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(actions.endFailure());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Thao tác thất bại!',
        variant: 'error',
      }),
    );
  }
}

export function* answer(payload) {
  try {
    const { response } = yield call(request, {
      url: '/play/answer/question',
      method: 'POST',
      data: payload.payload,
    });
    console.log(response);
    if (response) {
      yield put(actions.answerSuccess());
    } else {
      yield put(actions.answerFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Trả lời thất bại!',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(actions.answerFailure());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Trả lời thất bại!',
        variant: 'error',
      }),
    );
  }
}

export function* quizPageSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.end.type, end);
  yield takeLatest(actions.answer.type, answer);
}
