import {connect} from 'react-redux';
import {Actions} from '../../../Actions/index';
import CameraScreen from './CameraScreen';

const mapPropsToState = state => {
  return {
    flashMode: state.settingReducer.flashMode || 0,
    cameraType: state.settingReducer.cameraType || 0,
    textMode: state.settingReducer.textMode || 0,
    aspectRatio: state.settingReducer.aspectRatio || 0,
    cameraAspectRatio: state.settingReducer.cameraAspectRatio || [],
    hideCameraSettingsIcons: state.settingReducer.hideCameraSettingsIcons,
    photoArray: state.galleryReducer.photoArray,
    autoTagValue: state.settingReducer.autoTagValue || '',
    autoTagEnabled: state.settingReducer.autoTagEnabled || false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCameraType: cameraType => {
      return dispatch(Actions.settingActions.changeCameraType(cameraType));
    },
    addNewPhoto: newPhoto => {
      return dispatch(Actions.galleryActions.addPhotoToList(newPhoto));
    },
    setCameraAspectRatio: ratio => {
      return dispatch(Actions.settingActions.setCameraAspectRatio(ratio));
    },
    hideCameraSettings: hide_status => {
      return dispatch(Actions.settingActions.hideCameraSettings(hide_status));
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(CameraScreen);
