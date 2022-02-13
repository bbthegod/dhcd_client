/*
 *
 * HomePage
 *
 */
import { useContext, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AuthStorageContext from 'context/AuthStorageContext';
import './index.scss';

interface Props {}

export default function HomePage(props: Props) {
  const AuthStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const auth = AuthStorage.get();
  console.log(auth);
  const user = useMemo(() => auth?.user, [auth]);
  return (
    <Container className="home-page">
      <div>
        <div className="block-1">
          <div className="item-1" onClick={() => history.push('/file')}>
            <Typography variant="h3" component="h3">
              HỆ THỐNG CÁC VĂN BẢN PHỤC VỤ ĐẠI HỘI
            </Typography>
          </div>
          <div className="item-2" onClick={() => history.push('/survey')}>
            <Typography variant="h3" component="h3">
              CÁC CÂU HỎI KHẢO SÁT ĐẦU GIỜ
            </Typography>
          </div>
        </div>
        <div className={`block-${user.role === 'user' ? 1 : 2}`}>
          <div className="item-3" onClick={() => history.push('/quiz')}>
            <Typography variant="h3" component="h3">
              TRÒ CHƠI GIỮA GIỜ
            </Typography>
          </div>
          {user.role === 'user' && (
            <div className="item-4" onClick={() => history.push('/quiz')}>
              <Typography variant="h3" component="h3">
                ĐIỂM DANH
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
