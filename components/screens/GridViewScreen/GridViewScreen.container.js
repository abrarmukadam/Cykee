import {connect} from 'react-redux';
import GridViewScreen from './GridViewScreen';
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
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(GridViewScreen);
