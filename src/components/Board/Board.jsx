/* eslint-disable */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

// Materials
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Grid,
} from '@material-ui/core';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setBoard, deletePostit } from '../../actions/actions';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  grid: {
    marginTop: '2rem',
  },
  card: {
    width: '20rem',
    minHeight: '15rem',
  },
  color: {
    width: '100%',
    height: '1rem',
  },
});

function Board() {
  const { id } = useParams();
  const classes = useStyles();
  const currentBoard = useSelector((state) => state.boards[id]);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setBoard(parseInt(id, 10), { propagate: true }));
  }, [id]);

  const handleDeletePostit = (i) => {
    dispatch(deletePostit(parseInt(i, 10), { propagate: true }));
  };

  return (
    <Grid container justify="center" spacing={2} className={classes.grid}>
      {
        currentBoard.postits.map((postit, i) => (
          <Grid item key={`card-${postit.title}`}>
            <div className={classes.color} style={{ backgroundColor: postit.color }} />
            <Card style={{ backgroundColor: '#FBF397' }} className={classes.card}>
              <Button color="primary" onClick={() => handleDeletePostit(i)}>
                <DeleteIcon />
              </Button>
              <CardContent>
                <h2>{postit.title}</h2>
                <hr style={{ borderTop: `1px solid ${postit.color}` }} />
                { postit.text }
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  );
}

export default Board;
