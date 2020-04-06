import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class EditIcon extends Component {
  state = {};
  render() {
    return (
      <Icon name="pencil" size={GlobalIconSize} color={GalleryIconColor} />
    );
  }
}

export default EditIcon;
