
import React from 'react';
import './index.css';
import App from './components/App';
//import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store, {Persistor} from './store'

import { Provider } from "react-redux";

//persist data stored in the LocalStorage
import { PersistGate } from 'redux-persist/integration/react';
//Based on the guide here
//https://stackoverflow.com/questions/65658510/export-firestore-imported-as-firebase-was-not-found-in-firebase-after-up
import firebase from 'firebase/compat/app'

firebase.initializeApp({
  apiKey: "",
  authDomain: "bitpasar.firebaseapp.com",
  projectId: "bitpasar",
  storageBucket: "bitpasar.appspot.com",
  messagingSenderId: "",
  appId: ""
})


//WITH REDUX
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate Loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

