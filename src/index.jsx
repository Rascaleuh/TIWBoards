import React from 'react';
// import { isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';

import AppToolbar from './components/AppToolbar/AppToolbar';
import Board from './components/Board/Board';
import store from './store/store';

function App() {
  return (
    // /#/boards/:id
    // /#/boards/:id/postit/:id
    // /#/boards/:id/postit/:id/edit
    <Router>
      <AppToolbar />
      <Switch>
        {/* { isMobile
        && <Redirect from="/board/:boardId" to="/board/:boardId/postit/0" /> } */}
        <Route path="/board/:boardId/postit/:postitId">
          <Board mobile />
        </Route>
        <Route path="/board/:boardId">
          <Board />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
