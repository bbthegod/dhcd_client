/*
 *
 * Dashboard
 *
 */
import React, { useState, useRef, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import SnackbarContext from 'context/SnackbarContext';
import { actions } from './slice';
import { selectSnackBar, selectMessage, selectVariant } from './slice/selectors';
import logo from 'assets/images/logo.png';
import SideBar from 'app/components/SideBar/loadable';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [sideBar, setSideBar] = useState(false);
  function toggleSidbar() {
    setSideBar(!sideBar);
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
              <Box>
                <IconButton size="large" onClick={toggleSidbar}>
                  <MenuIcon />
                </IconButton>
                <SideBar isOpen={sideBar} toggleSidbar={toggleSidbar} />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <main>{children}</main>
      </SnackbarProvider>
    </SnackbarContext.Provider>
  );
}
