/*
 *
 * LoginPage State
 *
 */
export interface LoginPageState {
  data: AuthStorage | undefined;
  loading: boolean;
  success: boolean;
  failure: boolean;
  snackbar: boolean;
  variant: string;
  message: string;
}
