import {connect} from 'react-redux';
import PreviewImageScreen from './PreviewImageScreen';
import {Actions} from './../../../Actions/index';

const mapPropsToState = state => {
  return {
    photoArray: state.galleryReducer.photoArray || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPhoto: newPhoto => {
      return dispatch(Actions.galleryActions.addPhotoToList(newPhoto));
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(PreviewImageScreen);
