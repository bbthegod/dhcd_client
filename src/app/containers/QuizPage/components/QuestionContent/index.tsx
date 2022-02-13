/*
 *
 * QuestionContent
 *
 */
import { Button, Typography, Divider } from '@mui/material';
import classes from './styles.module.css';

interface Props {
  index: number;
  playData: PlayData;
  question: Question;
  answerQuestion: Function;
}

export default function QuestionContent({ playData, index, question, answerQuestion }: Props) {
  return (
    <>
      <Typography variant="h4" component="h4" className={classes.questionContent}>
        Câu hỏi {index + 1}: {question.content}
      </Typography>
      <div className={classes.buttonBox}>
        {question?.options?.map(item => (
          <Button
            variant="contained"
            key={item.numbering}
            className={classes.button}
            onClick={() => answerQuestion(item.numbering)}
            color={playData.questions[index].answer === item.numbering ? 'secondary' : 'primary'}
          >
            {item.answer}
          </Button>
        ))}
        <Divider variant="middle" className={classes.divider} style={{ margin: '20px 0' }} />
      </div>
    </>
  );
}
