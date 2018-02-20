import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { firebase as firebaseConfig } from './src/config';
import { createStore } from 'redux';
import reducer from './src/reducer';

exports.replaceRouterComponent = ({ history }) => {
  firebase.initializeApp(firebaseConfig);
  const store = createStore(reducer);

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};
