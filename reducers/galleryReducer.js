import {
  ADD_PHOTO,
  FAV_PHOTO,
  DELETE_PHOTO,
  SELECT_PHOTO,
  PHOTO_LOADED,
  SCREEN_MOUNTED,
} from '../Actions/actionTypes';

const defaultState = {
  photoArray: [],
  status: {
    isLoading: false,
    isLoaded: false,
    isFailed: false,
  },
  screenMounted: '',
};

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
    case SELECT_PHOTO: {
      return {
        ...state,
        status: {
          isLoading: true,
          isLoaded: false,
          isFailed: false,
        },
      };
    }
    case PHOTO_LOADED: {
      return {
        ...state,
        status: {
          isLoading: false,
          isLoaded: true,
          isFailed: false,
        },
      };
    }
    case SCREEN_MOUNTED: {
      return {
        ...state,
        screenMounted: action.payload.screenMounted,
      };
    }
    default:
      return state;
  }
}
