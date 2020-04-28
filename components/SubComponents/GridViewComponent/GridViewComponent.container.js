import {connect} from 'react-redux';
import GridViewComponent from './GridViewComponent';
import {Actions} from '../../../Actions/index';

const mapPropsToState = state => {
  return {
    photoArray: state.galleryReducer.photoArray,
    hideCaption: state.settingReducer.hideCaption,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    favPhoto: (photoArray, photo_uri) => {
      return dispatch(Actions.galleryActions.favPhoto(photoArray, photo_uri));
    },
    deletePhotoFromList: newPhotoArray => {
      return dispatch(
        Actions.galleryActions.deletePhotoFromList(newPhotoArray),
      );
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(GridViewComponent);
