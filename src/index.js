import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './scss/custom.scss';
import './fonts/Novecentosanswide-Bold.otf'
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <BrowserRouter><App/></BrowserRouter>,
  document.getElementById('root')
);
