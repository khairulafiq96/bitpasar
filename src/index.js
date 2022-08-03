
import React from 'react';
import './index.css';
import App from './components/App';
//import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from './middleware';

//persist data stored in the LocalStorage
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig={
  key:'main-root',
  storage
}

const persistedReducer=persistReducer(persistConfig)

//No persist data
const store = createStore(reducer,middleware)

//with Persist data
//const store = createStore(persistedReducer,middleware)

const Persistor = persistStore(store)


//WITH REDUX
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    
    <App />
    
  </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

