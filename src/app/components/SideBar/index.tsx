/*
 *
 * SideBar
 *
 */
import React, { useContext } from 'react';
import {
  Dialog,
  Toolbar,
  AppBar,
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
  ListItemButton,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AuthStorageContext from 'context/AuthStorageContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

import './index.scss';

interface Props {
  isOpen: boolean;
  toggleSidbar: Function;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function SideBar({ isOpen, toggleSidbar }: Props) {
  //====================================== Hooks ======================================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //====================================== Callback ======================================
  const goToQuiz = () => {
    history.push('/play');
    toggleSidbar();
  };

  const goToLogin = () => {
    if (auth) {
      history.push('/play');
    } else {
      history.push('/login');
    }
    toggleSidbar();
  };

  const logout = () => {
    toggleSidbar();
    localStorage.clear();
    history.push('/login');
  };
  //====================================== Render ======================================
  return (
    <Dialog className="root" fullScreen open={isOpen} onClose={() => toggleSidbar()} TransitionComponent={Transition}>
      <AppBar className="header">
        <Toolbar>
          <IconButton color="inherit" onClick={() => toggleSidbar()}>
            <CloseIcon className="headerIcon" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List component="nav" className="list">
        <ListItemButton onClick={goToQuiz}>
          <ListItemIcon className="iconBox">
            <PlayArrowIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="H??? Th???ng V??n B???n Ph???c V??? ?????i H???i" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="C??u H???i Kh???o S??t ?????u Gi???" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Tr?? Ch??i Gi???a Gi???" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Th???ng K?? Kh???o S??t" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="K???t Qu??? Tr?? Ch??i" className="text" />
        </ListItemButton>

        {auth && (
          <ListItemButton onClick={logout}>
            <ListItemIcon className="iconBox">
              <ExitToAppIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="????ng Xu???t" className="text" />
          </ListItemButton>
        )}
      </List>
    </Dialog>
  );
}
