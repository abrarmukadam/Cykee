import {connect} from 'react-redux';
import CameraRollScreen from './CameraRollScreen';

const mapPropsToState = state => {
  return {
    photoArray: state.galleryReducer.photoArray || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(CameraRollScreen);
