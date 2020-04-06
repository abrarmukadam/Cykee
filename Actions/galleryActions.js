import {ADD_PHOTO} from './actionTypes';

export function addPhotoToList(newPhoto) {
  return {
    type: ADD_PHOTO,
    payload: {
      newPhoto: newPhoto,
    },
  };
}
