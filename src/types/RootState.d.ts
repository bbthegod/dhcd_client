import { FilePageState } from 'app/containers/FilePage/slice/types';
import { LoginPageState } from 'app/containers/LoginPage/slice/types';
import { DashboardState } from 'app/containers/Dashboard/slice/types';
import { HomePageState } from 'app/containers/HomePage/slice/types';
import { SurveyPageState } from 'app/containers/SurveyPage/slice/types';
import { QuizPageState } from 'app/containers/QuizPage/slice/types';
// GENERATE NEW CONTAINER STATE ABOVE, DO NOT DELETE IT

interface RootState {
  filePage?: FilePageState;
  loginPage?: LoginPageState;
  dashboard?: DashboardState;
  homePage?: HomePageState;
  surveyPage?: SurveyPageState;
  quizPage?: QuizPageState;
  // GENERATE NEW REDUCER KEY ABOVE, DO NOT DELETE IT
}
