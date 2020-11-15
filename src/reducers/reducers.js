import {
  CREATE_POSTIT, DELETE_POSTIT, CREATE_BOARD, DELETE_BOARD, SET_BOARD,
  ADD_DRAW_POINTS,
  RESET_DRAW_POINTS,
} from '../actions/actions';

import BOARDS from '../data/boards.json';

const initialState = {
  index: 0,
  boards: BOARDS,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POSTIT:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, action.index),
          {
            ...state.boards[action.index],
            postits: [
              ...state.boards[action.index].postits,
              {
                type: 'postit',
                board: action.index,
                title: action.title,
                text: action.content,
                visible: true,
                color: action.color,
                drawing: {
                  clickX: [],
                  clickY: [],
                  clickDrag: [],
                },
              },
            ],
          },
          ...state.boards.slice(action.index + 1, state.boards.length),
        ],
      };
    case DELETE_POSTIT:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, state.index),
          {
            ...state.boards[state.index],
            postits: [
              ...state.boards[state.index].postits.slice(0, action.id),
              ...state.boards[state.index].postits.slice(action.id + 1),
            ],
          },
          ...state.boards.slice(state.index + 1, state.boards.length),
        ],
      };
    case ADD_DRAW_POINTS:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, state.index),
          {
            ...state.boards[state.index],
            postits: [
              ...state.boards[state.index].postits.slice(0, action.id),
              {
                ...state.boards[state.index].postits[action.id],
                drawing: {
                  clickX: action.clickX,
                  clickY: action.clickY,
                  clickDrag: action.clickDrag,
                },
              },
              ...state.boards[state.index].postits.slice(action.id + 1),
            ],
          },
          ...state.boards.slice(state.index + 1),
        ],
      };
    case RESET_DRAW_POINTS:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, state.index),
          {
            ...state.boards[state.index],
            postits: [
              ...state.boards[state.index].postits.slice(0, action.id),
              {
                ...state.boards[state.index].postits[action.id],
                drawing: {
                  clickX: [],
                  clickY: [],
                  clickDrag: [],
                },
              },
              ...state.boards[state.index].postits.slice(action.id + 1),
            ],
          },
          ...state.boards.slice(state.index + 1),
        ],
      };
    case CREATE_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards, {
            type: 'board',
            id: state.boards.length + 1,
            title: action.boardName,
            active: false,
            notes: '',
            postits: [],
          },
        ],
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, action.id),
          ...state.boards.slice(action.id + 1),
        ],
      };
    case SET_BOARD:
      return { ...state, index: action.id };
    default:
      return state;
  }
}

export default rootReducer;
