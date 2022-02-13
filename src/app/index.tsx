import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import NotFoundPage from 'app/components/NotFoundPage/loadable';
import PrivateRoute from 'app/components/PrivateRoute/loadable';
import AuthStorage from 'app/components/AuthStorage/loadable';
import FilePage from 'app/containers/FilePage/loadable';
import LoginPage from 'app/containers/LoginPage/loadable';
import HomePage from 'app/containers/HomePage/loadable';
import SurveyPage from 'app/containers/SurveyPage/loadable';
import QuizPage from 'app/containers/QuizPage/loadable';
import theme from 'assets/theme/index';
import 'assets/styles/style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <AuthStorage>
        <ThemeProvider theme={theme}>
          <Helmet titleTemplate="%s | React Opencore" defaultTitle="React Opencore">
            <meta name="description" content="React application" />
          </Helmet>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/file" component={FilePage} />
            <PrivateRoute path="/survey" component={SurveyPage} />
            <PrivateRoute path="/quiz" component={QuizPage} />
            <PrivateRoute exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </ThemeProvider>
      </AuthStorage>
    </BrowserRouter>
  );
}
