import {connect} from 'react-redux';
import CameraSettingComponent from './CameraSettingComponent';
import {Actions} from '../../../Actions/index';

const mapPropsToState = state => {
  return {
    hideCameraSettingsIcons: state.settingReducer.hideCameraSettingsIcons,
    aspectRatio: state.settingReducer.aspectRatio || 0,
    textMode: state.settingReducer.textMode || 0,
    flashMode: state.settingReducer.flashMode || 0,
    autoTagValue: state.settingReducer.autoTagValue || '',
    autoTagEnabled: state.settingReducer.autoTagEnabled || false,
    faceDetectionMode: state.settingReducer.faceDetectionMode,
    photoArray: state.galleryReducer.photoArray,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAspectRatio: aspectRatio => {
      return dispatch(Actions.settingActions.changeAspectRatio(aspectRatio));
    },
    hideCameraSettings: hide_status => {
      return dispatch(Actions.settingActions.hideCameraSettings(hide_status));
    },
    changeTextMode: textMode => {
      return dispatch(Actions.settingActions.changeTextMode(textMode));
    },
    changeFaceDetectionMode: faceDetectionMode => {
      return dispatch(
        Actions.settingActions.changeFaceDetectionMode(faceDetectionMode),
      );
    },
    changeFlashMode: flashMode => {
      return dispatch(Actions.settingActions.changeFlashMode(flashMode));
    },
    setAutoTagEnabled: autoTagEnabled => {
      return dispatch(Actions.settingActions.setAutoTagEnabled(autoTagEnabled));
    },
    autoTagSetting: autoTag => {
      return dispatch(Actions.settingActions.autoTagSetting(autoTag));
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(CameraSettingComponent);
