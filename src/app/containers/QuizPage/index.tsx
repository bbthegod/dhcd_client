/*
 *
 * QuizPage
 *
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from './slice';
import { selectPlayData } from './slice/selectors';

import { Container, Paper, Typography } from '@mui/material';
import QuestionContent from './components/QuestionContent';
import ControlButtons from './components/ControlButtons';
import QuestionList from './components/QuestionList';
import Loading from 'app/components/Loading';
import './index.scss';

interface Props {}

export default function QuizPage(props: Props) {
  //====================================== Hooks ======================================
  const playData = useSelector(selectPlayData);
  const dispatch = useDispatch();
  const history = useHistory();
  //====================================== State ======================================
  const [question, setQuestion] = useState<Question>();
  const [index, setIndex] = useState(0);
  //====================================== Effect ======================================

  //Login into socket and get data in the first time render
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);

  //Checking time out of current play session
  useEffect(() => {
    if (playData) {
      setQuestion(playData.questions[index].questionId);
    }
  }, [playData, index]);

  //====================================== Callback ======================================

  //Previous question
  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };

  //Next question
  const next = () => {
    if (playData && index < playData.questions.length - 1) setIndex(index + 1);
  };

  //End play
  const end = () => {
    dispatch(actions.end());
  };

  //Select question
  const selectQuestion = idx => setIndex(idx);

  //Anwser a question and send it through socket
  const answerQuestion = numbering => {
    if (numbering !== '') {
      dispatch(actions.answer({ index, numbering }));
    }
  };

  //====================================== Render ======================================
  return (
    <Container className="quiz-root">
      <Paper className="title" elevation={0}>
        <Typography variant="h2" component="h2">
          TRÒ CHƠI GIỮA GIỜ
        </Typography>
      </Paper>
      {!playData ? (
        <div className="quiz-announcement">
          <Typography variant="h2" component="h2">
            Trò chơi chưa bắt đầu!
          </Typography>
        </div>
      ) : playData && question && !playData.isEnded ? (
        <>
          <Paper className="content">
            <QuestionContent question={question} playData={playData} index={index} answerQuestion={answerQuestion} />
            <ControlButtons
              end={end}
              next={next}
              previous={previous}
              playData={playData}
              disabledPrev={index === 0}
              disabledNext={index === playData?.questions?.length - 1}
            />
          </Paper>
          <Paper className="list">
            <QuestionList playData={playData} selectQuestion={selectQuestion} />
          </Paper>
        </>
      ) : playData?.isEnded ? (
        <div className="quiz-announcement">
          <Typography variant="h2" component="h2">
            Trò chơi đã kết thúc!
          </Typography>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
