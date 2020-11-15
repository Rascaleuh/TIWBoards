import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';

// Materials
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from '../../actions/actions';

// Components
import Postit from '../Postit/Postit';
import BottomToolbar from '../AppToolbar/BottomToolbar';

import getBrowserFullscreenElementProp from '../../utils/fullscreen';

const useStyles = makeStyles({
  grid: {
    backgroundColor: 'white',
    marginTop: '2rem',
  },
  fullscreen: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

function Board({ mobile }) {
  const { boardId, postitId } = useParams();
  const classes = useStyles();
  const currentBoard = useSelector((state) => state.boards[boardId]);
  const dispatch = useDispatch();
  const refBoard = useRef(null);

  const toggleFullscreen = () => {
    document.exitFullscreen().catch(() => {
      if (getBrowserFullscreenElementProp()) {
        refBoard.current.requestFullscreen();
      }
    });
  };

  useEffect(() => {
    dispatch(setBoard(parseInt(boardId, 10), { propagate: true }));
  }, [boardId]);

  return (
    <>
      {
        currentBoard
          && (
            <Grid container justify="center" spacing={2} className={classes.grid} ref={refBoard}>
              {
                mobile
                  ? (
                    <Postit postit={currentBoard.postits[postitId]} id={parseInt(postitId, 10)} />
                  )
                  : (
                    currentBoard.postits.map((postit, i) => (
                      <Postit postit={postit} id={i} key={`card-${postit.title}`} />
                    ))
                  )
              }
            </Grid>
          )
      }
      {
        mobile
          ? (
            <BottomToolbar />
          )
          : (
            <Button variant="outlined" color="primary" onClick={toggleFullscreen} className={classes.fullscreen}>
              <FullscreenIcon />
            </Button>
          )
      }
    </>
  );
}

Board.propTypes = {
  mobile: PropTypes.bool,
};
Board.defaultProps = {
  mobile: false,
};

export default Board;
