import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import reducer from './src/reducer';
import { firebase as firebaseConfig } from './src/config';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  firebase.initializeApp(firebaseConfig);
  const store = createStore(reducer);

  const ConnectedBody = () => (
    <Provider store={store}>{bodyComponent}</Provider>
  );
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
