import {connect} from 'react-redux';
import HideCaption from './HideCaption';
import {Actions} from '../../../Actions/index';

const mapPropsToState = state => {
  return {
    hideCaption: state.settingReducer.hideCaption,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideCaptionAction: hideCaption => {
      return dispatch(Actions.settingActions.hideCaptionAction(hideCaption));
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(HideCaption);
