import {applyMiddleware, compose, createStore as createReduxStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {reducers} from './reducers'
import mysaga from './sagas'

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();


  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation
  // ======================================================

  let store = createReduxStore(reducers, initialState, composeEnhancers(applyMiddleware(sagaMiddleware), ...enhancers));
  // in such way we can store all state in localStorage
  // store.subscribe(() => {
  //     localStorage.setItem('state', JSON.stringify(store.getState()));
  // });
  sagaMiddleware.run(mysaga);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
};

export default createStore
