/* eslint-disable */
import { CREATE_POSTIT, DELETE_POSTIT, CREATE_BOARD, DELETE_BOARD, SET_BOARD } from '../actions/index';
import BOARDS from '../data/boards.json';


const initialState = {
    index: 0,
    boards: BOARDS
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
                    type: "postit",
                    board: action.index,
                    title: action.title,
                    text: action.content,
                    visible: true,
                    color: '#0E0'
                  }
                ],
              },
              ...state.boards.slice(action.index + 1, state.boards.length)
            ],
          };
      case DELETE_POSTIT:
          return 0
      case CREATE_BOARD:
          const newBoard = {
            "type": "board",
            "id": state.boards.length+1,
            "title": action.boardName,
            "active": false,
            "notes": "",
            "postits":[]
          }
          return { ...state, boards: [
            ...state.boards, newBoard
          ] }
      case DELETE_BOARD:
          return { ...state, boards: [state.boards] }
      case SET_BOARD:
        return { ...state, index: action.id }
      default:
          return state
  }
};

export default rootReducer;