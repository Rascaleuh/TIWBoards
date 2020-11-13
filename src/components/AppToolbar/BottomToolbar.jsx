// React
import React from 'react';

// Materials
import {
  AppBar, IconButton, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  bottomToolbar: {
    top: 'auto',
    bottom: 0,
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },
}));

function BottomToolbar() {
  const classes = useStyles();
  const handlePreviousPostit = () => {
    /* eslint-disable no-console */
    console.log('previous');
  };

  const handleNextPostit = () => {
    /* eslint-disable no-console */
    console.log('next postit');
  };

  return (
    <AppBar position="fixed" className={classes.bottomToolbar}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <div className={classes.grow} />
        <IconButton color="inherit" onClick={handlePreviousPostit}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleNextPostit}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default BottomToolbar;
