import {connect} from 'react-redux';
import CameraRollScreen from './CameraRollScreen';
import {Actions} from '../../../Actions/index';

const mapPropsToState = state => {
  return {
    photoArray: state.galleryReducer.photoArray || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    screen_mounted: screenMounted => {
      return dispatch(Actions.galleryActions.screen_mounted(screenMounted));
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(CameraRollScreen);
