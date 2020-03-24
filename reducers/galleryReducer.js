import {ADD_PHOTO} from '../Actions/actionTypes';

const defaultState = {photoArray: []};

export default function galleryReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_PHOTO: {
      return {
        photoArray: [...state.photoArray, action.payload.newPhoto],
      };
    }
    default:
      return state;
  }
}
