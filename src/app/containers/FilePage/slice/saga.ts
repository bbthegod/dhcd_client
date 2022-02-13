/*
 *
 * FilePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as snackbarActions } from 'app/containers/Dashboard/slice';
import { request } from 'utils/request';
import { actions } from '.';

export function* get() {
  try {
    const { response, error } = yield call(request, {
      url: `/file`,
      method: 'GET',
    });
    if (response) {
      yield put(actions.getSuccess(response));
    } else if (error) {
      yield put(actions.getFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Thao tác thất bại!',
          variant: 'success',
        }),
      );
    } else {
      yield put(actions.getFailure());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Thao tác thất bại!',
          variant: 'success',
        }),
      );
    }
  } catch (err) {
    yield put(actions.getFailure());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Thao tác thất bại!',
        variant: 'success',
      }),
    );
  }
}

export function* filePageSaga() {
  yield takeLatest(actions.get.type, get);
}
