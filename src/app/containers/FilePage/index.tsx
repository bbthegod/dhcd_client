/*
 *
 * FilePage
 *
 */
import { useEffect, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Paper, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthStorageContext from 'context/AuthStorageContext';

import { selectData } from './slice/selectors';
import { BASE_URL } from 'constants/config';
import { actions } from './slice';
import './index.scss';

interface Props {}

export default function FilePage(props: Props) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const AuthStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const auth = AuthStorage.get();
  const user = useMemo(() => auth?.user, [auth]);
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);
  return (
    <Container className="file-root">
      <div className="title-wrapper">
        <Paper className="go-back" elevation={0} onClick={() => history.push('/')}>
          <ArrowBackIcon />
        </Paper>
        <Paper className="title" elevation={0}>
          <Typography variant="h2" component="h2">
            Hệ Thống Văn Bản Phục Vụ Đại Hội
          </Typography>
        </Paper>
      </div>
      <Grid className="file-wrappper">
        {data
          .filter(item => item.allowUser && user?.role === 'delegate')
          .map(item => (
            <Grid item xs={12}>
              <a href={`${BASE_URL}${item.url}`} target="_blank" rel="noreferrer">
                <Paper className="file">{item.filename}</Paper>
              </a>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
