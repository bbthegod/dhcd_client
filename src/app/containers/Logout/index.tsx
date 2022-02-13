/*
 *
 * Logout
 *
 */
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {}

export default function Logout(props: Props) {
  const history = useHistory();
  useEffect(() => {
    localStorage.clear();
    history.push('/');
  }, [history]);
  return <h1>Logging out...</h1>;
}
