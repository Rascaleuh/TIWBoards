// React
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

// Materials
import {
  AppBar, IconButton, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

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
  const { boardId, postitId } = useParams();
  const currentBoard = useSelector((state) => state.boards[state.index]);
  const nextPostit = parseInt(postitId, 10) + 1;
  const previousPostit = parseInt(postitId, 10) - 1;

  return (
    <AppBar position="fixed" className={classes.bottomToolbar}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <div className={classes.grow} />
        {
          currentBoard && previousPostit >= 0
            ? (
              <Link to={`/board/${boardId}/postit/${previousPostit}`}>
                <IconButton style={{ color: 'white' }}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Link>
            )
            : (
              <IconButton style={{ color: 'gray' }}>
                <ArrowBackIosIcon />
              </IconButton>
            )
        }
        {
          currentBoard && nextPostit < currentBoard.postits.length
            ? (
              <Link to={`/board/${boardId}/postit/${nextPostit}`}>
                <IconButton style={{ color: 'white' }}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Link>
            )
            : (
              <IconButton style={{ color: 'gray' }}>
                <ArrowForwardIosIcon />
              </IconButton>
            )
        }
      </Toolbar>
    </AppBar>
  );
}

export default BottomToolbar;
