import {ADD_PHOTO, FAV_PHOTO, DELETE_PHOTO} from '../Actions/actionTypes';

const defaultState = {photoArray: []};

export default function galleryReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_PHOTO: {
      return {
        ...state,
        photoArray: [action.payload.newPhoto, ...state.photoArray],
      };
    }
    case DELETE_PHOTO: {
      return {
        ...state,
        photoArray: [...action.payload.newPhotoArray],
      };
    }
    case FAV_PHOTO: {
      return {
        ...state,
        photoArray: [...action.payload.updatedPhotoArray],
      };
    }
    default:
      return state;
  }
}
