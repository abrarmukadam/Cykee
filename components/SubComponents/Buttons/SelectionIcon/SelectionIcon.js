import React, {Component} from 'react';
import {
  GlobalIconSize,
  GalleryIconColor,
  TEXT_BUTTON_COLOR,
  CykeeColor,
} from '../index';
import Icon from 'react-native-vector-icons/Ionicons';

class SelectionIcon extends Component {
  state = {};
  render() {
    const {selectedStatus} = this.props;
    return (
      <Icon
        name={
          this.props.selectedStatus
            ? 'ios-checkmark-circle'
            : 'ios-radio-button-off'
        }
        size={this.props.iconSize ? this.props.iconSize : GlobalIconSize}
        color={this.props.selectedStatus ? CykeeColor : 'white'}
      />
    );
  }
}

export default SelectionIcon;
