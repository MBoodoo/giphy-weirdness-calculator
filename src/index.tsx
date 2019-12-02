import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers'

const middlewares = [thunk, logger, promise]
const store = createStore(rootReducer, applyMiddleware(...middlewares))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
