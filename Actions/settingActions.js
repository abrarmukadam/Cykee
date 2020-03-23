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
