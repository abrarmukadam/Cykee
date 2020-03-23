import {combineReducers} from 'redux';
import settingReducer from './settingReducer';

export const reducers = combineReducers({
  settingReducer: settingReducer,
});
