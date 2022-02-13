/*
 *
 * ControlButtons
 *
 */
import { useState } from 'react';
import Button from '@mui/material/Button';

import ConfirmDialog from 'app/components/ConfirmDialog';
import classes from './styles.module.css';

interface Props {
  next: Function;
  previous: Function;
  end: Function;
  playData: PlayData;
  disabledPrev: boolean;
  disabledNext: boolean;
}

export default function ControlButtons({ previous, next, end, playData, disabledPrev, disabledNext }: Props) {
  const [open, setOpen] = useState(false);
  const checkedCount = playData.questions.filter(question => question.answered).length;
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        className={classes.sideButton}
        onClick={() => previous()}
        disabled={disabledPrev}
        color="primary"
      >
        TRƯỚC
      </Button>
      <Button
        variant="contained"
        className={classes.centerButton}
        onClick={() => setOpen(true)}
        style={{ display: checkedCount === playData.questions.length ? 'block' : 'none' }}
        // disabled={disabledPrev}
        color="primary"
      >
        KẾT THÚC
      </Button>
      <Button
        variant="contained"
        className={classes.sideButton}
        onClick={() => next()}
        disabled={disabledNext}
        color="primary"
      >
        SAU
      </Button>
      <ConfirmDialog message="Bạn có muốn kết thúc vòng chơi ?" open={open} setOpen={setOpen} handleAction={end} />
    </div>
  );
}
