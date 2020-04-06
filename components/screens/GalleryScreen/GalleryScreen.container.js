import {connect} from 'react-redux';
import GalleryScreen from './GalleryScreen';

const mapPropsToState = (state) => {
  return {
    photoArray: state.galleryReducer.photoArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapPropsToState, mapDispatchToProps)(GalleryScreen);
