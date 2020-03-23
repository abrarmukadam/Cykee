const defaultState = {};
import {FLASH_MODE, CAMERA_TYPE, TEXT_MODE} from '../Actions/actionTypes';

export default function settingReducer(state = defaultState, action) {
  switch (action.type) {
    case FLASH_MODE: {
      return {
        ...state,
        flashMode: action.payload.flashMode,
      };
    }
    case CAMERA_TYPE: {
      return {
        ...state,
        cameraType: action.payload.cameraType,
      };
    }
    case TEXT_MODE: {
      return {
        ...state,
        textMode: action.payload.textMode,
      };
    }

    default: {
      return state;
    }
  }
}
