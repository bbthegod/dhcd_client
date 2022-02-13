/*
 *
 * SurveyPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as snackbarActions } from 'app/containers/Dashboard/slice';
import { request } from 'utils/request';
import { actions } from '.';

export function* send(payload) {
  try {
    const { response, error } = yield call(request, {
      url: '/user/submit/survey',
      method: 'post',
      data: payload.payload,
    });
    if (response) {
      yield put(actions.sendSuccess());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Khảo sát đã được gửi!',
          variant: 'success',
        }),
      );
    } else if (error.response.status === 409) {
      yield put(actions.sendFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Bạn chỉ được gửi một bản khảo sát!',
          variant: 'error',
        }),
      );
    } else if (error) {
      yield put(actions.sendFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Khảo sát thất bại',
          variant: 'error',
        }),
      );
    } else {
      yield put(actions.sendFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Khảo sát thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(actions.sendFailure());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Khảo sát thất bại',
        variant: 'error',
      }),
    );
  }
}

export function* surveyPageSaga() {
  yield takeLatest(actions.send.type, send);
}
