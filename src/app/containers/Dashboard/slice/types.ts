/*
 *
 * Dashboard State
 *
 */
export interface DashboardState {
  data: any;
  loading: boolean;
  success: boolean;
  failures: boolean;
  snackbar: boolean;
  variant: string;
  message: string;
}
