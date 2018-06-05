import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import App from './app';
import reducers from './reducers';

import './styles/main.scss';

const STORAGE_KEY = 'senseis-top';

const persistToLocalStorage = ({getState}) => {
  return next => action => {
    next(action);
    const currentState = getState();
    const {self, activeRoom, settings} = currentState;
    const saveState = {
      self,
      storedRoom: activeRoom,
      storedSettings: settings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveState));
  };
};

const getPreloadedState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  // we need to try/catch this in case saved state ever becomes
  // corrupted-- otherwise it's possible for people to get stuck
  // in a loop where JSON.parse always fails unless they know
  // how to clear localStorage.
  try {
    return savedState ? JSON.parse(savedState) : {};
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
};

const store = createStore(
  reducers,
  getPreloadedState(),
  compose(
    applyMiddleware(persistToLocalStorage),
    devToolsEnhancer()
  )
);

// This timeout is to prevent a flash of unstyled content
// caused by webpack's style-loader when running the app
// in development. We have to prevent FUOC since some
// components rely on styles being active on mount to
// measure element sizes.
//
// It's not needed in prod since style sheets are loaded
// via <link>s in the header, but it shouldn't hurt anything.
setTimeout(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
