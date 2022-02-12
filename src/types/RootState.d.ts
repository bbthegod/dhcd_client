import { HomePageState } from 'app/containers/HomePage/slice/types';
import { LoginPageState } from 'app/containers/LoginPage/slice/types';
import { DashboardState } from 'app/containers/Dashboard/slice/types';
// GENERATE NEW CONTAINER STATE ABOVE, DO NOT DELETE IT

interface RootState {
  homePage?: HomePageState;
  loginPage?: LoginPageState;
  dashboard?: DashboardState;
  // GENERATE NEW REDUCER KEY ABOVE, DO NOT DELETE IT
}
