import React, {Component} from 'react';
import {GlobalIconSize, GlobalIconColor} from '../index';
import Icon from 'react-native-vector-icons/Ionicons';

class MoreIcon extends Component {
  state = {};
  render() {
    return (
      <Icon
        name="ios-more"
        size={GlobalIconSize}
        color={GlobalIconColor}
        onPress={() => this.props.onPressMore()}
        style={{paddingVertical: 10}}
      />
    );
  }
}

export default MoreIcon;
