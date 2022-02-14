/*
 *
 * Dashboard
 *
 */
import { useRef, useEffect, useContext, useMemo, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import SnackbarContext from 'context/SnackbarContext';
import { useHistory } from 'react-router-dom';
import { actions } from './slice';
import { selectSnackBar, selectMessage, selectVariant } from './slice/selectors';
import AuthStorageContext from 'context/AuthStorageContext';
import ConfirmDialog from 'app/components/ConfirmDialog';
import logo from 'assets/images/logo.png';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './index.scss';

interface Props {
  children: any;
}

export default function Dashboard({ children }: Props) {
  //====================================== Hook ======================================
  const snackbar = useSelector(selectSnackBar);
  const message = useSelector(selectMessage);
  const variant = useSelector(selectVariant);
  const providerRef = useRef<any>();
  const dispatch = useDispatch();
  const AuthStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const auth = AuthStorage.get();
  const user = useMemo(() => auth?.user, [auth]);
  const [openDialog, setOpenDialog] = useState(false);
  function logout() {
    localStorage.clear();
    history.push('/login');
  }
  //====================================== Effect ======================================
  useEffect(() => {
    if (snackbar) {
      open(message, variant);
      dispatch(actions.closeSnackbar());
    }
  }, [dispatch, message, variant, snackbar]);
  //====================================== Callback ======================================
  const open = (message: string, variant: string) => {
    providerRef.current.enqueueSnackbar(message, { variant: variant });
  };
  //====================================== Render ======================================
  return (
    <SnackbarContext.Provider value={{ open }}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        ref={providerRef}
      >
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box className="header-logo">
                <img src={logo} alt="logo" />
              </Box>
              <Typography variant="h1" component="h1" className="header-text">
                ĐẠI HỘI CHI ĐOÀN CƠ SỞ VĂN PHÒNG TRUNG ƯƠNG ĐOÀN
              </Typography>
              <Box className="header-back">
                <Typography variant="h5" component="h5" className="user-name" onClick={() => setOpenDialog(true)}>
                  {user?.fullname}
                </Typography>
                <ConfirmDialog
                  message="Đăng xuất tài khoản?"
                  open={openDialog}
                  setOpen={setOpenDialog}
                  handleAction={logout}
                />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <main>{children}</main>
      </SnackbarProvider>
    </SnackbarContext.Provider>
  );
}
