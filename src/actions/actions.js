export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const CREATE_POSTIT = 'CREATE_POSTIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';
export const NEXT_POSTIT = 'NEXT_POSTIT';
export const PREVIOUS_POSTIT = 'PREVIOUS_POSTIT';

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

export function nextPostit(id, meta) {
  return {
    type: NEXT_POSTIT,
    meta,
    id,
  };
}

export function previousPostit(id, meta) {
  return {
    type: PREVIOUS_POSTIT,
    meta,
    id,
  };
}
