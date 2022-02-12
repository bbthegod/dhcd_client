/*
 *
 * LoginPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* login(payload) {
  try {
    const { response } = yield call(request, {
      url: '/auth/login',
      method: 'POST',
      data: {
        userName: payload.payload.username,
        password: payload.payload.password,
      },
    });
    if (response) {
      yield put(actions.loginSuccess(response));
    } else {
      yield put(actions.loginFailure());
      yield put(
        actions.openSnackbar({
          message: 'Đăng nhập thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(actions.loginFailure());
    yield put(
      actions.openSnackbar({
        message: 'Đăng nhập thất bại',
        variant: 'error',
      }),
    );
  }
}

export function* loginPageSaga() {
  yield takeLatest(actions.login.type, login);
}
