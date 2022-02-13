/*
 *
 * HomePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { homePageSaga } from './saga';
import { HomePageState } from './types';

export const initialState: HomePageState = {
  data: [],
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    checkin(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    checkinSuccess(state) {
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    checkinFailure(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const homePageSlice = { key: slice.name, reducer: slice.reducer, saga: homePageSaga };
