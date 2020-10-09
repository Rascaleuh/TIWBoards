/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import AppToolbar from './components/AppToolbar/AppToolbar';
import Board from './components/Board/Board';
import Boards from './data/boards.json';

function App() {
  const [boards, setBoards] = useState(Boards);
  return (
    <>
      <AppToolbar boards={boards} index={0} />
      <Board board={boards} index={0}/>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
