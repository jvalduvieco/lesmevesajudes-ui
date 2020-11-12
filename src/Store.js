import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger, {createLogger} from 'redux-logger';
import reduxThunk from 'redux-thunk'
import rootReducer from './RootReducer';
import isDevelopment from './shared/isDevelopment';


export default function configureStore(initialState) {
  console.log('Configure store...');
  /*const logger = createLogger({
    // ...options
    collapsed: true,
    logErrors: true
  });*/
  const middlewares = applyMiddleware(reduxThunk, logger);

  return isDevelopment
      ? createStore(rootReducer, initialState, composeWithDevTools(middlewares))
      : createStore(rootReducer, initialState, middlewares);
}
