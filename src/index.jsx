import React from 'react';
import ReactDOM from 'react-dom';
import Titre from './components/titre';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = () => (
  <div className="container">
    <Titre />
  </div>
);
ReactDOM.render(<Index />, document.getElementById('root'));
