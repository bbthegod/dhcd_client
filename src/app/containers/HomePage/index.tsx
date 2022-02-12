/*
 *
 * HomePage
 *
 */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Grid, Typography } from '@mui/material';

import { selectData } from './slice/selectors';
import { BASE_URL } from 'constants/config';
import { actions } from './slice';
import './index.scss';

interface Props {}

export default function HomePage(props: Props) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);
  return (
    <Container className="home-root">
      <Paper className="title" elevation={0}>
        <Typography variant="h2" component="h2">
          Hệ Thống Văn Bản Phục Vụ Đại Hội
        </Typography>
      </Paper>
      <Grid className="file-wrappper">
        {data.map(item => (
          <Grid item xs={2} sm={4}>
            <a href={`${BASE_URL}${item.url}`} target="_blank" rel="noreferrer">
              <Paper className="file">{item.filename}</Paper>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
