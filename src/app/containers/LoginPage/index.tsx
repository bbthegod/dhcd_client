/*
 *
 * LoginPage
 *
 */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Container, Paper, TextField, Grid, Button, Typography, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthStorageContext from 'context/AuthStorageContext';
import SnackbarContext from 'context/SnackbarContext';
import { actions } from './slice';
import { selectData, selectLoading, selectSnackBar, selectMessage, selectVariant } from './slice/selectors';
import Logo from 'assets/images/logo.png';
import './index.scss';

interface Props {}

export default function LoginPage(props: Props) {
  //====================================== Hook ======================================
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const snackbar = useSelector(selectSnackBar);
  const message = useSelector(selectMessage);
  const variant = useSelector(selectVariant);
  const AuthStorage = useContext(AuthStorageContext);
  const Snackbar = useContext(SnackbarContext);
  const providerRef = useRef<any>();
  const dispatch = useDispatch();
  const history = useHistory();
  //====================================== State ======================================
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  //====================================== Effect ======================================
  //Open snackbar when login failed
  useEffect(() => {
    if (snackbar) {
      open(message, variant);
      setTimeout(() => {
        dispatch(actions.closeSnackbar());
      }, 2000);
    }
  }, [Snackbar, dispatch, message, variant, snackbar]);

  //Redirect to play when success
  useEffect(() => {
    if (data) {
      AuthStorage.set(data, () => {
        history.push('/');
      });
    }
    return () => {
      dispatch(actions.reset());
    };
  }, [history, data, dispatch, AuthStorage]);
  //====================================== Callback ======================================
  const open = (message: string, variant: string) => {
    providerRef.current.enqueueSnackbar(message, { variant: variant });
  };
  function onSubmit() {
    if (username && password) {
      dispatch(actions.login({ username, password }));
    }
  }
  //====================================== Render ======================================
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      ref={providerRef}
    >
      <Container className="login-wrapper">
        <Grid container className="center-inside">
          <Grid item xs={10} sm={8} md={4} lg={4} xl={2}>
            <Paper className="login-paper">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>
              <Typography variant="h4" component="h4">
                ĐĂNG NHẬP
              </Typography>
              <TextField
                autoComplete="off"
                error={!!!username && username != null}
                className="input"
                variant="outlined"
                fullWidth
                helperText={!!!username && username != null && 'Tên đăng nhập không được để trống!'}
                label="Tên đăng nhập"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
                onBlur={() => username === null && setUsername('')}
              />
              <TextField
                autoComplete="off"
                error={!!!password && password != null}
                className="input"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                helperText={!!!password && password != null && 'Mật khẩu không được để trống!'}
                label="Mật Khẩu"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                onBlur={() => password === null && setPassword('')}
              />
              <div className="show-password">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {showPassword ? 'Ẩn' : 'Hiện'} Mật Khẩu
              </div>
              <Button variant="contained" fullWidth size="large" onClick={onSubmit} disabled={loading}>
                ĐĂNG NHẬP
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </SnackbarProvider>
  );
}
