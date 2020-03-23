import {FLASH_MODE, CAMERA_TYPE, TEXT_MODE} from './actionTypes';

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
export function changeTextMode(textMode) {
  console.log('Change textMode called');
  return {
    type: TEXT_MODE,
    payload: {
      textMode: textMode,
    },
  };
}
