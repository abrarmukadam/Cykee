import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GalleryIconColor, GlobalIconSize} from '../index';

class GalleryIcon extends Component {
  render() {
    return (
      <Icon
        name={'ios-images'}
        size={GlobalIconSize}
        color={this.props.iconColor ? this.props.iconColor : GalleryIconColor}
      />
    );
  }
}

export default GalleryIcon;
