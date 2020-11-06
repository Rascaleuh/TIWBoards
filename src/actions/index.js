export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const CREATE_POSTIT = 'CREATE_POSTIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';

export function createBoard(boardName) {
  return {
    type: CREATE_BOARD,
    boardName,
  };
}

export function deleteBoard(id) {
  return {
    type: DELETE_BOARD,
    id,
  };
}

export function setBoard(id) {
  return {
    type: SET_BOARD,
    id,
  };
}

export function createPostit(title, content, index) {
  return {
    type: CREATE_POSTIT,
    title,
    content,
    index,
  };
}

export function deletePostit(text) {
  return {
    type: DELETE_POSTIT,
    text,
  };
}
