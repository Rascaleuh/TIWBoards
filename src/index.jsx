import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AppToolbar from './components/AppToolbar/AppToolbar';
import Board from './components/Board/Board';
import store from './store/store';

function App() {
  return (
    <Router>
      <AppToolbar />
      <Switch>
        {/* { isMobile
        && <Redirect from="/board/:boardId" to="/board/:boardId/postit/0" /> } */}
        <Route path="/board/:boardId/postit/:postitId">
          <Board mobile />
        </Route>
        <Route path="/board/:boardId">
          {
            isMobile
              ? <Redirect from="/board/:boardId" to="/board/:boardId/postit/0" />
              : <Board />
          }
          {/* <Board /> */}
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
