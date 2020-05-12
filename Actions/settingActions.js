import {
  FLASH_MODE,
  CAMERA_TYPE,
  TEXT_MODE,
  ASPECT_RATIO,
  HIDE_CAPTION,
  CAMERA_ASPECT_RATIO,
  HIDE_CAMERA_SETTINGS,
} from './actionTypes';

export function changeFlashMode(flashMode) {
  console.log('Change FlashMode called');
  return {
    type: FLASH_MODE,
    payload: {
      flashMode: flashMode,
    },
  };
}

export function changeCameraType(cameraType) {
  console.log('Change cameraType called');
  return {
    type: CAMERA_TYPE,
    payload: {
      cameraType: cameraType,
    },
  };
}
export function changeAspectRatio(aspectRatio) {
  console.log('Change aspectRatio called');
  return {
    type: ASPECT_RATIO,
    payload: {
      aspectRatio: aspectRatio,
    },
  };
}
export function changeTextMode(textMode) {
  console.log('Change textMode called');
  return {
    type: TEXT_MODE,
    payload: {
      textMode: textMode,
    },
  };
}
export function hideCaptionAction(hideCaption) {
  console.log('Change hideCaptionAction called');
  return {
    type: HIDE_CAPTION,
    payload: {
      hideCaption: hideCaption,
    },
  };
}
export function setCameraAspectRatio(ratio) {
  console.log('Change hideCaptionAction called');
  return {
    type: CAMERA_ASPECT_RATIO,
    payload: {
      cameraAspectRatio: ratio,
    },
  };
}
export function hideCameraSettings(hideSettings) {
  console.log('Change hideCameraSettings called');
  return {
    type: HIDE_CAMERA_SETTINGS,
    payload: {
      hideCameraSettingsIcons: hideSettings,
    },
  };
}
