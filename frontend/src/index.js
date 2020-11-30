import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  
import './App.scss';    // puxando o bootstrap para dentro da app

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare);   // escolha os icones a incorporar na sua lib

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
