import React from 'react';
import PropTypes from 'prop-types';

// Materials
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton, Grid,
} from '@material-ui/core';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';

// Redux
import { useDispatch } from 'react-redux';
import { deletePostit } from '../../actions/actions';

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
    position: 'relative',
  },
  postitColor: {
    width: '100%',
    height: '1rem',
    borderRadius: '4px 4px 0 0',
  },
  deleteButton: {
    display: 'block',
    backgroundColor: '#DD4445',
    position: 'absolute',
    bottom: '0',
    right: '0',
    margin: '0 0.5rem 0.5rem 0',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  deleteIcon: {
    color: 'white',
    '&:hover': {
      color: '#DD4445',
    },
  },
});

function Postit({ postit, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeletePostit = (i) => {
    dispatch(deletePostit(parseInt(i, 10), { propagate: true }));
  };

  return (
    <Grid item>
      <div className={classes.postitColor} style={{ backgroundColor: postit.color }} />
      <Card style={{ backgroundColor: '#FBF397' }} className={classes.card}>
        <CardContent>
          <h2>{postit.title}</h2>
          <hr style={{ borderTop: `1px solid ${postit.color}` }} />
          { postit.text }
        </CardContent>
        <IconButton size="small" onClick={() => handleDeletePostit(id)} className={classes.deleteButton}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </Card>
    </Grid>
  );
}

Postit.propTypes = {
  postit: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
};

export default Postit;
