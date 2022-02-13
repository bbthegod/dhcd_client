/*
 *
 * Dashboard Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { dashboardSaga } from './saga';
import { DashboardState } from './types';

export const initialState: DashboardState = {
  data: [],
  loading: false,
  success: false,
  failures: false,
  snackbar: false,
  variant: '',
  message: '',
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
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
  },
});

export const { actions } = slice;

export const dashboardSlice = { key: slice.name, reducer: slice.reducer, saga: dashboardSaga };
