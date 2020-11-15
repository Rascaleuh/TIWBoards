import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';

// Materials
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from '../../actions/actions';

// Components
import Postit from '../Postit/Postit';
import BottomToolbar from '../AppToolbar/BottomToolbar';

const useStyles = makeStyles({
  grid: {
    marginTop: '2rem',
  },
});

function Board({ mobile }) {
  const { boardId, postitId } = useParams();
  const classes = useStyles();
  const currentBoard = useSelector((state) => state.boards[boardId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBoard(parseInt(boardId, 10), { propagate: true }));
  }, [boardId]);

  return (
    <>
      {
        currentBoard
          && (
            <Grid container justify="center" spacing={2} className={classes.grid}>
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
        mobile && <BottomToolbar />
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
