/*
 *
 * LoginPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { loginPageSaga } from './saga';
import { LoginPageState } from './types';

export const initialState: LoginPageState = {
  data: undefined,
  loading: false,
  success: false,
  failures: false,
  snackbar: false,
  variant: '',
  message: '',
};

const slice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    login(state, payload) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    loginSuccess(state, actions) {
      state.data = actions.payload;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    loginFailure(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    openSnackbar(state, payload) {
      state.snackbar = true;
      state.variant = payload.payload.variant;
      state.message = payload.payload.message;
    },
    closeSnackbar(state) {
      state.snackbar = false;
      state.variant = '';
      state.message = '';
    },
    reset(state) {
      state.data = undefined;
      state.loading = false;
      state.success = false;
      state.failures = false;
      state.snackbar = false;
      state.variant = '';
      state.message = '';
    },
  },
});

export const { actions } = slice;

export const loginPageSlice = { key: slice.name, reducer: slice.reducer, saga: loginPageSaga };
