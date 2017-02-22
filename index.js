import thunk from 'redux-thunk';
import reducers from './reducers';

// import { composeWithDevTools } from 'remote-redux-devtools';
// mport createLogger from 'redux-logger';


import routes from './src/routes';


// const logger = createLogger();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers,
    applyMiddleware(thunk)
  );


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.querySelector('.app')
);
