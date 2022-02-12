/*
 *
 * PrivateRoute
 *
 */

import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import AuthStorageContext from 'context/AuthStorageContext';
import Dashboard from 'app/containers/Dashboard';

export default function PrivateRoute({ component: InnerComponent, location, ...rest }) {
  //====================================== Hook ======================================
  const AuthStorage = useContext(AuthStorageContext);
  //====================================== Const ======================================
  const auth = AuthStorage.get();
  //====================================== Render ======================================
  return (
    <Route
      {...rest}
      render={props => {
        if (auth) {
          return (
            <Dashboard>
              <InnerComponent {...props} />
            </Dashboard>
          );
        }
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }}
    />
  );
}
