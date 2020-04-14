import {applyMiddleware, createStore} from 'redux';
import {reducers} from './reducers/index';
import logger from 'redux-logger';

//import thunkMiddleware from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage';

let middleware = [logger];

const persistConfig = {
  key: 'root1111',
  storage: AsyncStorage,
  // whitelist: ['settingReducer', 'galleryReducer'], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);
