import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducer';
import { config } from '../../common/config';

let middleware = [thunk];

if (config.env === 'local') {
    middleware = [...middleware, logger];
}

export default function configureStore() {
 return createStore(
  rootReducer,
   applyMiddleware(...middleware)
 );
}