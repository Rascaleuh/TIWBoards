import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';

// Materials
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton, Grid,
} from '@material-ui/core';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deletePostit, addDrawPoints, resetDrawPoints } from '../../actions/actions';
import {
  options, triangle, circle, leftArrow,
  rightArrow,
} from '../../data/gestures';
import OneDollar from '../../librairy/onedollar';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  grid: {
    marginTop: '2rem',
  },
  card: {
    position: 'relative',
    width: '350px',
  },
  postitColor: {
    height: '1rem',
    borderRadius: '4px 4px 0 0',
  },
  actions: {
    flexDirection: 'row-reverse',
  },
  deleteButton: {
    backgroundColor: '#DD4445',
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
  resetButton: {
    backgroundColor: '#59BD9C',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'white',
    },
    marginRight: '0.5rem',
  },
  resetIcon: {
    color: 'white',
    '&:hover': {
      color: '#59BD9C',
    },
  },
});

function Postit({ postit, id }) {
  if (!postit) {
    return (
      <p>Pas de postit ici !</p>
    );
  }

  const classes = useStyles();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const boards = useSelector((state) => state.boards);

  // canvas pos
  const {
    clickX, clickY, clickDrag,
  } = postit.drawing;
  const refCanvas = useRef(null);
  let paint = false;

  // gesture pos
  let gesturePoints = [];
  let gesture = false;

  // $1
  const recognizer = new OneDollar(options);
  recognizer.add('triangle', triangle);
  recognizer.add('circle', circle);
  recognizer.add('leftArrow', leftArrow);
  recognizer.add('rightArrow', rightArrow);

  const addClick = (x, y, dragging) => {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  };

  const addGesture = (x, y) => {
    gesturePoints.push([x, y]);
  };

  const resetGesture = () => {
    gesturePoints = [];
  };

  const redraw = () => {
    const context = refCanvas.current.getContext('2d');
    const { width, height } = refCanvas.current.getBoundingClientRect();

    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);
    context.clearRect(0, 0, context.width, context.height);

    context.strokeStyle = postit.color;
    context.lineJoin = 'round';
    context.lineWidth = 2;

    for (let i = 0; i < clickX.length; i += 1) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1] * width, clickY[i - 1] * height);
      } else {
        context.moveTo(clickX[i] * width - 1, clickY[i] * height);
      }
      context.lineTo(clickX[i] * width, clickY[i] * height);
      context.closePath();
      context.stroke();
    }

    if (gesture) {
      context.strokeStyle = '#666';
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(gesturePoints[0][0] * width, gesturePoints[0][1] * height);
      for (let i = 1; i < gesturePoints.length; i += 1) {
        context.lineTo(gesturePoints[i][0] * width, gesturePoints[i][1] * height);
      }
      context.moveTo(
        gesturePoints[gesturePoints.length - 1][0], gesturePoints[gesturePoints.length - 1][1],
      );
      context.closePath();
      context.stroke();
    }
  };

  const pointerDownHandler = (ev) => {
    const pType = ev.pointerType;
    const {
      width, height, top, left,
    } = refCanvas.current.getBoundingClientRect();
    console.log(ev.changedTouches);
    const mouseX = ((ev.pageX || ev.changedTouches[0].pageX) - left) / width;
    const mouseY = ((ev.pageY || ev.changedTouches[0].pageY) - top) / height;

    switch (pType) {
      case 'mouse':
        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
        break;
      case 'pen':
        // Nous n'avons pas de stylet pour tester
        // Le code reste quand même disponible si vous pouvez tester
        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
        break;
      case 'touch':
        gesture = true;
        addGesture(mouseX, mouseY);
        redraw();
        break;
      default:
        break;
    }
  };

  const pointerMoveHandler = (ev) => {
    const {
      width, height, top, left,
    } = refCanvas.current.getBoundingClientRect();
    const mouseX = ((ev.pageX || ev.changedTouches[0].pageX) - left) / width;
    const mouseY = ((ev.pageY || ev.changedTouches[0].pageY) - top) / height;
    if (paint) {
      addClick(mouseX, mouseY, true);
    } else if (gesture) {
      addGesture(mouseX, mouseY);
    }
    redraw();
  };

  const pointerUpEvent = () => {
    if (gesture) {
      const gestureName = recognizer.check(gesturePoints).name;
      switch (gestureName) {
        case 'rightArrow':
          if (boardId + 1 < boards.length) {
            window.location.hash = `/board/${parseInt(boardId, 10) + 1}/postit/0`;
          }
          break;
        case 'leftArrow':
          if (boardId - 1 >= 0) {
            window.location.hash = `/board/${parseInt(boardId, 10) - 1}/postit/0`;
          }
          break;
        default:
          break;
      }
    }
    dispatch(addDrawPoints({
      id,
      clickX,
      clickY,
      clickDrag,
    }, { propagate: true }));
    paint = false;
    gesture = false;
    resetGesture();
  };

  const handleDeletePostit = () => {
    dispatch(deletePostit(id, { propagate: true }));
  };

  const handleResetDrawing = () => {
    dispatch(resetDrawPoints(id, { propagate: true }));
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    redraw();
  }, [postit]);

  useEffect(() => {
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.body.removeEventListener('touchmove', preventDefault);
  }, []);

  return (
    <Grid item>
      <Card style={{ backgroundColor: '#FBF397' }} className={classes.card}>
        <div className={classes.postitColor} style={{ backgroundColor: postit.color }} />
        <CardContent>
          <h2>{postit.title}</h2>
          <p>{ postit.text }</p>
          <canvas
            className={classes.stroke}
            ref={refCanvas}
            onPointerDown={pointerDownHandler}
            onPointerMove={pointerMoveHandler}
            onPointerUp={pointerUpEvent}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <IconButton size="small" onClick={handleDeletePostit} className={classes.deleteButton}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
          <IconButton size="small" onClick={handleResetDrawing} className={classes.resetButton}>
            <RotateLeftIcon className={classes.resetIcon} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

Postit.propTypes = {
  postit: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.number.isRequired,
};

Postit.defaultProps = {
  postit: undefined,
};

export default Postit;
