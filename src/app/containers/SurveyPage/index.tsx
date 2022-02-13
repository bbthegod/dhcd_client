/*
 *
 * SurveyPage
 *
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Grid, Typography } from '@mui/material';
import { actions } from './slice';
import { selectData } from './slice/selectors';
import './index.scss';

interface Props {}

export default function SurveyPage(props: Props) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);
  console.log(data);
  return (
    <Container className="survey-root">
      <Paper className="title" elevation={0}>
        <Typography variant="h2" component="h2">
          CÁC CÂU HỎI KHẢO SÁT ĐẦU GIỜ
        </Typography>
      </Paper>
      <Grid className="survey-wrappper">
        {/* {data.map(item => (
      <Grid item xs={2} sm={4}>
        <a href={`${BASE_URL}${item.url}`} target="_blank" rel="noreferrer">
          <Paper className="file">{item.filename}</Paper>
        </a>
      </Grid>
    ))} */}
      </Grid>
    </Container>
  );
}
