/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AppToolbar from './components/AppToolbar/AppToolbar';
import Board from './components/Board/Board';
import store from './store/index';

function App() {
  return (
    <Router>
      <AppToolbar />
      <Switch>
        <Route path="/:id">
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
  document.getElementById('root')
)