import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"

import reducer from "./auth/reducer"

let composeEnhancers =  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose; 
if(!composeEnhancers){
  composeEnhancers = compose
}
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
