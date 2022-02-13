/**
 *
 * AuthStorage
 *
 */
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import AuthStorageContext from 'context/AuthStorageContext';

export default function AuthStorage(props) {
  //====================================== Hook ======================================
  const history = useHistory();
  //====================================== Callback ======================================
  const get = () => {
    try {
      if (localStorage.getItem('auth')) {
        let decoded = jwt.verify(localStorage.getItem('auth'), 'shhhhh');
        return decoded;
      }
      return null;
    } catch (err) {
      localStorage.clear();
      history.push('/');
    }
  };

  const set = (data: AuthStorage, callback: Function) => {
    let auth = {
      token: data.token,
      user: data.user,
    };
    jwt.sign(auth, 'shhhhh', (err, token) => {
      if (!err) {
        localStorage.setItem('auth', token);
        callback();
      }
    });
  };
  //====================================== Render ======================================
  return <AuthStorageContext.Provider value={{ get, set }}>{props.children}</AuthStorageContext.Provider>;
}
