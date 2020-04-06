import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import Icon from 'react-native-vector-icons/Ionicons';

class MoreIcon extends Component {
  state = {};
  render() {
    return (
      <Icon name="md-more" size={GlobalIconSize} color={GalleryIconColor} />
    );
  }
}

export default MoreIcon;
