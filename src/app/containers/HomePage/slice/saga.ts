/*
 *
 * HomePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as snackbarActions } from 'app/containers/Dashboard/slice';
import { request } from 'utils/request';
import { actions } from '.';

export function* checkin() {
  try {
    const { response, error } = yield call(request, {
      url: '/user/submit/checkin',
      method: 'GET',
    });
    if (response) {
      yield put(actions.checkinSuccess());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Điểm danh thành công!',
          variant: 'success',
        }),
      );
    } else if (error) {
      yield put(actions.checkinFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Thao tác thất bại!',
          variant: 'error',
        }),
      );
    } else {
      yield put(actions.checkinFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Thao tác thất bại!',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(actions.checkinFailure());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Thao tác thất bại!',
        variant: 'error',
      }),
    );
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.checkin.type, checkin);
}
