import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import NotFoundPage from 'app/components/NotFoundPage/loadable';
import HomePage from 'app/containers/HomePage/loadable';
import 'assets/styles/style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s | React Opencore" defaultTitle="React Opencore">
        <meta name="description" content="React application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
