/*
 *
 * SurveyPage
 *
 */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  FormGroup,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { actions } from './slice';
import './index.scss';

interface Props {}

const survey = [
  {
    multiple: false,
    content:
      'Đồng chí đã từng rơi vào tình trạng phải lục tìm hết đống hồ sơ, tài liệu nhưng vẫn không tìm thấy một công văn, một tờ trình đã từng thực hiện?',
    answer: 'Có/Không',
  },
  {
    multiple: false,
    content:
      'Theo đồng chí từ khi áp dụng E-office (văn phòng điện tử) thời lượng từ khi bắt đầu xây dựng đến khi ban hành được một văn bản được rút ngắn bao nhiêu?',
    answer:
      'Mất thời gian hơn so với không dùng E-office/Vẫn giữ nguyên, không được rút ngắn/Rút ngắn được từ 30% đến 50% thời lượng so với không dùng E-office/Rút ngắn được trên 50% thời lượng so với không dùng E-office',
  },
  {
    multiple: false,
    content: 'Theo đồng chí trong năm 2021 lượng giấy tờ in ấn các đồng chí tiêu thụ giảm đi bao nhiêu?',
    answer:
      'Có chiều hướng tăng lên/Không có sự thay đổi/Giảm được 30% so với các năm trước/Giảm được trên 50% so với các năm trước',
  },
  {
    multiple: true,
    content:
      'Theo đồng chí trong thời gian tới cần phát triển, bổ sung các tiện ích nào để phục vụ đắc lực công tác chuyên môn của mình (đại biểu có thể lựa chọn nhiều đáp án)',
    answer:
      'Thư viện số (dễ dàng tìm kiếm các văn bản, giấy tờ của Trung ương Đoàn và các tỉnh, thành đoàn, đoàn trực thuộc trên internet)/Tiện ích đăng ký sử dụng cơ sở vật chất cơ quan trực tuyến (phòng họp, xe cộ,….)/Lắp đặt hệ thống ipad hoặc laptop để tự tra cứu dữ liệu tại các phòng họp, phòng hội nghị cho đại biểu tham dự/Cả 3 đáp án trên',
  },
];
export default function SurveyPage(props: Props) {
  const [result, setResult] = useState<Boolean[][]>([[]]);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    let arr: Boolean[][] = [[]];
    for (let i = 0; i < 10; i++) {
      arr[i] = [];
      for (let j = 0; j < 10; j++) {
        arr[i][j] = false;
      }
    }
    setResult(arr);
  }, []);
  function getResult(row, col, multiple) {
    let arr = result;
    if (!multiple) {
      for (let i = 0; i < 10; i++) {
        arr[row][i] = false;
      }
    }
    arr[row][col] = true;
    setResult(arr);
    getDisableButton(arr);
  }
  function getDisableButton(rsl) {
    const arr = rsl.filter(item => item.some(i => i));
    setDisabled(survey.length !== arr.length);
  }
  function onSubmit() {
    dispatch(actions.send({ data: result }));
  }
  return (
    <Container className="survey-root">
      <div className="title-wrapper">
        <Paper className="go-back" elevation={0} onClick={() => history.push('/')}>
          <ArrowBackIcon />
        </Paper>
        <Paper className="title" elevation={0}>
          <Typography variant="h2" component="h2">
            CÁC CÂU HỎI KHẢO SÁT ĐẦU GIỜ
          </Typography>
        </Paper>
      </div>
      <Grid className="survey-wrappper">
        {survey.map((item, index) => (
          <div className="survey">
            <Typography variant="h4" component="h4">
              {index + 1}. {item.content}
            </Typography>
            {!item.multiple && (
              <RadioGroup name="radio-buttons-group">
                {item.answer.split('/').map((answer, idx) => (
                  <FormControlLabel
                    value={`${index}.${idx}`}
                    control={<Radio />}
                    label={answer}
                    onChange={() => getResult(index, idx, item.multiple)}
                  />
                ))}
              </RadioGroup>
            )}
            {item.multiple && (
              <FormGroup>
                {item.answer.split('/').map((answer, idx) => (
                  <FormControlLabel
                    value={`${index}.${idx}`}
                    control={<Checkbox />}
                    label={answer}
                    onChange={() => getResult(index, idx, item.multiple)}
                  />
                ))}
              </FormGroup>
            )}
          </div>
        ))}
        <div className="submit-button">
          <Button variant="contained" onClick={onSubmit} disabled={disabled}>
            Gửi đánh giá
          </Button>
        </div>
      </Grid>
    </Container>
  );
}
