import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class ShareIcon extends Component {
  state = {};
  render() {
    return (
      <Icon
        name="share"
        size={this.props.iconSize ? this.props.iconSize : GlobalIconSize}
        color={GalleryIconColor}
      />
    );
  }
}

export default ShareIcon;
