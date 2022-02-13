/*
 *
 * FilePage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.filePage || initialState;

export const selectData = createSelector(selectSlice, state => state.data);

export const selectLoading = createSelector(selectSlice, state => state.loading);

export const selectSuccess = createSelector(selectSlice, state => state.success);

export const selectFailure = createSelector(selectSlice, state => state.failures);
