import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/main.scss';

const App = () => (
  <div>Hello</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
