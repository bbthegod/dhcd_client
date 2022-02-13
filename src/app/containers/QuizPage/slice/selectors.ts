/*
 *
 * QuizPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.quizPage || initialState;

export const selectPlayData = createSelector(selectSlice, state => state.playData);

export const selectLoading = createSelector(selectSlice, state => state.loading);

export const selectSuccess = createSelector(selectSlice, state => state.success);

export const selectFailure = createSelector(selectSlice, state => state.failures);
