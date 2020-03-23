import {connect} from 'react-redux';
import {Actions} from '../../../Actions/index';
import CameraScreen from './CameraScreen';

const mapPropsToState = state => {
  return {
    flashMode: state.settingReducer.flashMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFlashMode: flashMode => {
      return dispatch(Actions.settingActions.changeFlashMode(flashMode));
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(CameraScreen);
