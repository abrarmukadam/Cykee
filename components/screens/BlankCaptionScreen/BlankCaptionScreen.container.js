import {connect} from 'react-redux';
import BlankCaptionScreen from './BlankCaptionScreen';
import {Actions} from '../../../Actions/index';

const mapPropsToState = state => {
  return {
    photoArray: state.galleryReducer.photoArray,
    autoTagValue: state.settingReducer.autoTagValue || '',
    autoTagEnabled: state.settingReducer.autoTagEnabled || false,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPhoto: newPhoto => {
      return dispatch(Actions.galleryActions.addPhotoToList(newPhoto));
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(BlankCaptionScreen);
