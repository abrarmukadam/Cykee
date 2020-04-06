import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import Icon from 'react-native-vector-icons/Entypo';

class FavouriteIcon extends Component {
  state = {};
  render() {
    return (
      <Icon
        name="heart-outlined"
        size={GlobalIconSize}
        color={GalleryIconColor}
      />
    );
  }
}

export default FavouriteIcon;
