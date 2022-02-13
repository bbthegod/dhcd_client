/*
 *
 * FilePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { filePageSaga } from './saga';
import { FilePageState } from './types';

export const initialState: FilePageState = {
  data: [],
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'filePage',
  initialState,
  reducers: {
    get(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getSuccess(state, actions) {
      state.data = actions.payload.data;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getFailure(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const filePageSlice = { key: slice.name, actions: slice.actions, reducer: slice.reducer, saga: filePageSaga };
