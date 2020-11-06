/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';

// Materials
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createBoard, setBoard } from '../../actions/index';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  grid: {
    marginTop: "2rem",
  },
  card: {
    width: "20rem",
    minHeight: "15rem"
  },
  color: {
    width: "100%",
    height: "1rem"
  }
});

function Board() {
  const { id } = useParams();
  const classes = useStyles();
  const currentBoard = useSelector(state => state.boards[state.index]);
  const dispatch = useDispatch();
  
  useEffect( () => {
    if (id != currentBoard.index) {
      dispatch(setBoard(parseInt(id, 10)));      
    }
  }, [id]); 

  return (
    <Grid container justify="center" spacing={2} className={classes.grid}>
      {
        currentBoard.postits.map((postit, i) => (
          <Grid item key={"card-" + i}>
            <div className={classes.color} style={{backgroundColor : postit.color}}></div>
            <Card style={{backgroundColor : "#FBF397"}} className={classes.card}>
                <CardContent >
                  <h2>{postit.title}</h2>
                  <hr style={{borderTop: "1px solid " + postit.color}}/>
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
