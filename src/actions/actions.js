export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const CREATE_POSTIT = 'CREATE_POSTIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';
export const NEXT_POSTIT = 'NEXT_POSTIT';
export const PREVIOUS_POSTIT = 'PREVIOUS_POSTIT';
export const ADD_DRAW_POINTS = 'ADD_DRAW_POINTS';
export const RESET_DRAW_POINTS = 'RESET_DRAW_POINTS';

export function createBoard(boardName) {
  return {
    type: CREATE_BOARD,
    boardName,
  };
}

export function deleteBoard(id, meta) {
  return {
    type: DELETE_BOARD,
    meta,
    id,
  };
}

export function setBoard(id, meta) {
  return {
    type: SET_BOARD,
    meta,
    id,
  };
}

export function createPostit(postit, meta) {
  return {
    type: CREATE_POSTIT,
    meta,
    index: postit.index,
    title: postit.title,
    content: postit.content,
    color: postit.color,
  };
}

export function deletePostit(id, meta) {
  return {
    type: DELETE_POSTIT,
    meta,
    id,
  };
}

export function addDrawPoints(drawing, meta) {
  return {
    type: ADD_DRAW_POINTS,
    meta,
    id: drawing.id,
    clickX: drawing.clickX,
    clickY: drawing.clickY,
    clickDrag: drawing.clickDrag,
  };
}

export function resetDrawPoints(id, meta) {
  return {
    type: RESET_DRAW_POINTS,
    meta,
    id,
  };
}
