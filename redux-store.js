import {applyMiddleware, createStore} from 'redux';
import {reducers} from './reducers/index';
import logger from 'redux-logger';

//import thunkMiddleware from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';

import {AsyncStorage} from 'react-native';

let middleware = [logger];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //   whitelist: ['affirmationReducer', 'visionBoardReducer'], // which reducer want to store
  //blacklist: ['loginReducer.status'],
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);
