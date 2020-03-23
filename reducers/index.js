import {combineReducers} from 'redux';
import settingReducer from './settingReducer';
import galleryReducer from './galleryReducer';

export const reducers = combineReducers({
  settingReducer: settingReducer,
  galleryReducer: galleryReducer,
});
