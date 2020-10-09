/* eslint-disable */
import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      left: '90%',
      margin: '0 auto',
    },
  }));

function AppToolbar({ boards, index }) {
  const [anchorEl, setAnchorEl]=useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
      <Button aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          boards.map((board,index)=>(
            <MenuItem onClick={handleClose} key={index}>{ board.title }</MenuItem>
          ))
        }
      </Menu>
        <Typography variant="h6" color="inherit">
          { boards[index].title }
        </Typography>
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;