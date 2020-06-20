import React, {Component} from 'react';
import {GlobalIconSize, GlobalIconColor} from '../index';
import {View} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';
class BlankCaptionModeButton extends Component {
  state = {};
  render() {
    return (
      <Icon
        type={'material-community'}
        name={'file-document-edit-outline'}
        size={GlobalIconSize}
        color={GlobalIconColor}
        onPress={() => {
          this.props.onPressBlankCaption();
        }}
      />
    );
  }
}

export default BlankCaptionModeButton;
