import {connect} from 'react-redux';
import GalleryScreen from './GalleryScreen';
import {Actions} from '../../../Actions/index';

const mapPropsToState = (state) => {
  return {
    photoArray: state.galleryReducer.photoArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    favPhoto: (photoArray, photo_uri) => {
      return dispatch(Actions.galleryActions.favPhoto(photoArray, photo_uri));
    },
    deletePhotoFromList: (newPhotoArray) => {
      return dispatch(
        Actions.galleryActions.deletePhotoFromList(newPhotoArray),
      );
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(GalleryScreen);
