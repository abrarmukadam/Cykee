import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import Icon from 'react-native-vector-icons/EvilIcons';

class DeleteIcon extends Component {
  state = {};
  render() {
    return (
      <Icon
        name="trash"
        size={this.props.iconSize ? this.props.iconSize : GlobalIconSize + 6}
        color={GalleryIconColor}
      />
    );
  }
}

export default DeleteIcon;
