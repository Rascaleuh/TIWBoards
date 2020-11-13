import io from 'socket.io-client';

/* eslint-disable import/no-cycle */
import store from '../store/store';
import {
  setBoard, deleteBoard, createPostit, deletePostit,
} from '../actions/actions';

const socket = io();

export const propagateSocket = () => (next) => (action) => {
  if (action.meta.propagate) {
    switch (action.type) {
      case 'SET_BOARD':
        socket.emit('action', { type: 'set_board', value: action.id });
        break;
      case 'DELETE_BOARD':
        socket.emit('action', { type: 'delete_board', value: action.id });
        break;
      case 'CREATE_POSTIT':
        socket.emit('action', {
          type: 'create_postit',
          value: {
            index: action.index,
            title: action.title,
            content: action.content,
          },
        });
        break;
      case 'DELETE_POSTIT':
        socket.emit('action', { type: 'delete_postit', value: action.id });
        break;
      default:
        break;
    }
  } else if (action.type === 'SET_BOARD') {
    window.location.hash = `/board/${action.id}`;
  }
  next(action);
};

socket.on('action', (msg) => {
  switch (msg.type) {
    case 'set_board':
      store.dispatch(setBoard(msg.value, { propagate: false }));
      break;
    case 'delete_board':
      store.dispatch(deleteBoard(msg.value, { propagate: false }));
      break;
    case 'create_postit':
      store.dispatch(createPostit(msg.value, { propagate: false }));
      break;
    case 'delete_postit':
      store.dispatch(deletePostit(msg.value, { propagate: false }));
      break;
    default:
      break;
  }
});

export default propagateSocket;
