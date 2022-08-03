import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from './middleware';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'main-root',
    storage
  }
  
const persistedReducer=persistReducer(persistConfig, reducer)

//No persist data
//const store = createStore(reducer,middleware)

//with Persist data
const store = createStore(persistedReducer,middleware)

const Persistor = persistStore(store)

export {Persistor}
export default store;