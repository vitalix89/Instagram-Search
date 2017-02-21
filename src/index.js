

import React from 'react';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import ReactDom from 'react-dom';
// import optimistPromiseMiddleware from 'redux-optimist-promise';

import thunk from 'redux-thunk';
import reducers from '../reducers';

// import { composeWithDevTools } from 'remote-redux-devtools';
// mport createLogger from 'redux-logger';


import routes from './routes';


// const logger = createLogger();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers,
    applyMiddleware(thunk)
  );


ReactDom.render(
  hello, document.querySelector('.app')
);

