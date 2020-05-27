import {connect} from 'react-redux';
import PreviewImageScreen from './PreviewImageScreen';
import {Actions} from './../../../Actions/index';

const mapPropsToState = state => {
  return {
    // photoArray: state.galleryReducer.photoArray || [],
    autoTagValue: state.settingReducer.autoTagValue || '',
    autoTagEnabled: state.settingReducer.autoTagEnabled || false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPhoto: newPhoto => {
      return dispatch(Actions.galleryActions.addPhotoToList(newPhoto));
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
)(PreviewImageScreen);
