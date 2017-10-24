const React = require('react');
const ReactDOM = require('react-dom');

import { BrowserRouter } from 'react-router-dom';
import { App } from './scenes/app/App.js';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));

const Home = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);
