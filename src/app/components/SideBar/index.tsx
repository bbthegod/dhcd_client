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
          <ListItemText primary="Hệ Thống Văn Bản Phục Vụ Đại Hội" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Câu Hỏi Khảo Sát Đầu Giờ" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Trò Chơi Giữa Giờ" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Thống Kê Khảo Sát" className="text" />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className="iconBox">
            <FavoriteIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Kết Quả Trò Chơi" className="text" />
        </ListItemButton>

        {auth && (
          <ListItemButton onClick={logout}>
            <ListItemIcon className="iconBox">
              <ExitToAppIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Đăng Xuất" className="text" />
          </ListItemButton>
        )}
      </List>
    </Dialog>
  );
}
