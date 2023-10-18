import { rootReducer } from '../reducers/rootReducer.js';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk));  


export const store = createStore(rootReducer, enhancer);

export const select = (selector) => {
  const state = store.getState();
  const data = selector(state);
  return data; 
}
