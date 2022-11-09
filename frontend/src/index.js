import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom';

const element = (
  <div>
    <h1>Bonjour, monde !</h1>
    <h2>Il est {new Date().toLocaleTimeString()}.</h2>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
);


