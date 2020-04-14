import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import Icon from 'react-native-vector-icons/Entypo';

class FavouriteIcon extends Component {
  state = {};
  render() {
    // fav_status = this.props.fav_status ? this.props.fav_status : false;
    return (
      <Icon
        name={this.props.fav_status ? 'heart' : 'heart-outlined'}
        size={this.props.iconSize ? this.props.iconSize : GlobalIconSize}
        color={this.props.iconColor ? this.props.iconColor : GalleryIconColor}
      />
    );
  }
}

export default FavouriteIcon;
