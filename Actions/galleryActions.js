import {
  ADD_PHOTO,
  FAV_PHOTO,
  DELETE_PHOTO,
  SELECT_PHOTO,
  PHOTO_LOADED,
} from './actionTypes';

export function addPhotoToList(newPhoto) {
  return {
    type: ADD_PHOTO,
    payload: {
      newPhoto: newPhoto,
    },
  };
}
export function deletePhotoFromList(newPhotoArray) {
  return {
    type: DELETE_PHOTO,
    payload: {
      newPhotoArray: newPhotoArray,
    },
  };
}
export function favPhoto(photoArray, photo_uri) {
  console.log('favPhoto run');

  photoArray.map(photo => {
    if (photo.uri == photo_uri) {
      // console.log(photo.fav_status);
      photo.fav_status = !photo.fav_status;
      return;
    }
  });
  // console.log('updatePhotoArray', photoArray);
  return {
    type: FAV_PHOTO,
    payload: {
      updatedPhotoArray: photoArray,
    },
  };
}
export function photo_selected() {
  console.log('photo_selected run');
  return {
    type: SELECT_PHOTO,
  };
}
export function photo_loaded() {
  console.log('photo_loaded run');
  return {
    type: PHOTO_LOADED,
  };
}
