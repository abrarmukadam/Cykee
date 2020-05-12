const defaultState = {
  flashMode: 0,
  textMode: true,
  cameraType: 1,
  aspectRatio: 0,
  hideCaption: false,
  cameraAspectRatio: [],
  hideCameraSettingsIcons: false,
};
import {
  FLASH_MODE,
  CAMERA_TYPE,
  TEXT_MODE,
  ASPECT_RATIO,
  ADD_PHOTO,
  HIDE_CAPTION,
  CAMERA_ASPECT_RATIO,
  HIDE_CAMERA_SETTINGS,
} from '../Actions/actionTypes';

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
    case ASPECT_RATIO: {
      return {
        ...state,
        aspectRatio: action.payload.aspectRatio,
      };
    }
    case HIDE_CAPTION: {
      return {
        ...state,
        hideCaption: action.payload.hideCaption,
      };
    }
    case CAMERA_ASPECT_RATIO: {
      return {
        ...state,
        cameraAspectRatio: action.payload.cameraAspectRatio,
      };
    }
    case HIDE_CAMERA_SETTINGS: {
      return {
        ...state,
        hideCameraSettingsIcons: action.payload.hideCameraSettingsIcons,
      };
    }
    default: {
      return state;
    }
  }
}
