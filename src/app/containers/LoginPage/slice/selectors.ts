/*
 *
 * LoginPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.loginPage || initialState;

export const selectData = createSelector(selectSlice, state => state.data);

export const selectLoading = createSelector(selectSlice, state => state.loading);

export const selectSuccess = createSelector(selectSlice, state => state.success);

export const selectFailure = createSelector(selectSlice, state => state.failures);

export const selectSnackBar = createSelector(selectSlice, state => state.snackbar);

export const selectMessage = createSelector(selectSlice, state => state.message);

export const selectVariant = createSelector(selectSlice, state => state.variant);
