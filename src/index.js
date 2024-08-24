import './lib/styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './game/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);