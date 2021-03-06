import {connect} from 'react-redux';
import {Actions} from '../../../Actions/index';
import CameraScreen from './CameraScreen';

const mapPropsToState = (state) => {
  return {
    flashMode: state.settingReducer.flashMode || 0,
    cameraType: state.settingReducer.cameraType || 0,
    textMode: state.settingReducer.textMode || 0,
    aspectRatio: state.settingReducer.aspectRatio || 0,
    photoArray: state.galleryReducer.photoArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFlashMode: (flashMode) => {
      return dispatch(Actions.settingActions.changeFlashMode(flashMode));
    },
    changeCameraType: (cameraType) => {
      return dispatch(Actions.settingActions.changeCameraType(cameraType));
    },
    changeAspectRatio: (aspectRatio) => {
      return dispatch(Actions.settingActions.changeAspectRatio(aspectRatio));
    },
    changeTextMode: (textMode) => {
      return dispatch(Actions.settingActions.changeTextMode(textMode));
    },
    addNewPhoto: (newPhoto) => {
      return dispatch(Actions.galleryActions.addPhotoToList(newPhoto));
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(CameraScreen);
