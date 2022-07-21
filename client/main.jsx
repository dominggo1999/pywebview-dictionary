import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyles from './styles/GlobalStyles.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
