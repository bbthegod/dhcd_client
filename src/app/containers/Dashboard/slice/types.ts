/*
 *
 * Dashboard State
 *
 */
export interface DashboardState {
  data: any;
  loading: boolean;
  success: boolean;
  failure: boolean;
  snackbar: boolean;
  variant: string;
  message: string;
}
