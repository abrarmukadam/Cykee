import {connect} from 'react-redux';
import FavoriteScreen from './FavoriteScreen';

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
)(FavoriteScreen);
