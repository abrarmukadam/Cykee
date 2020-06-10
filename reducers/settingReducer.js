const defaultState = {
  flashMode: 0,
  textMode: true,
  cameraType: 1,
  aspectRatio: 0,
  hideCaption: false,
  cameraAspectRatio: [],
  hideCameraSettingsIcons: false,
  autoTagValue: '',
  faceDetectionMode: true,
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
  SET_AUTO_TAG_ENABLED,
  AUTO_TAG_SETTING,
  FACE_DETECTION,
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
    case FACE_DETECTION: {
      return {
        ...state,
        faceDetectionMode: action.payload.faceDetectionMode,
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
    case AUTO_TAG_SETTING: {
      return {
        ...state,
        autoTagValue: action.payload.autoTagValue,
      };
    }
    case SET_AUTO_TAG_ENABLED: {
      return {
        ...state,
        autoTagEnabled: action.payload.autoTagEnabled,
      };
    }
    default: {
      return state;
    }
  }
}
