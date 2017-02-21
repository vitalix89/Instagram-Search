

import React from 'react';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import ReactDom from 'react-dom';


import thunk from 'redux-thunk';
import reducers from '../reducers';


import routes from './routes';


 const store = createStore(reducers,
    applyMiddleware(thunk)
  );


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.querySelector('.app')
);

