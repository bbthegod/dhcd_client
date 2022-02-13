/*
 *
 * QuizPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { quizPageSaga } from './saga';
import { QuizPageState } from './types';

export const initialState: QuizPageState = {
  playData: undefined,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'quizPage',
  initialState,
  reducers: {
    get(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getSuccess(state, actions) {
      state.playData = actions.payload;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getFailure(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    end(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    endSuccess(state, actions) {
      state.playData = actions.payload;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    endFailure(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    answer(state, actions) {
      let oldState = JSON.parse(JSON.stringify(state.playData));
      if (oldState) {
        oldState.questions[actions.payload.index].answer = actions.payload.numbering;
        oldState.questions[actions.payload.index].answered = true;
        state.playData = oldState;
      }
    },
    answerSuccess(state) {
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    answerFailure(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const quizPageSlice = { key: slice.name, reducer: slice.reducer, saga: quizPageSaga };
