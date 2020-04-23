import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor} from '../index';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
class FavouriteIcon extends Component {
  state = {};
  render() {
    // fav_status = this.props.fav_status ? this.props.fav_status : false;
    return (
      <Icon
        name={this.props.fav_status ? 'heart' : 'heart-outlined'}
        // color={this.props.fav_status ? 'grey' : 'white'}
        size={this.props.iconSize ? this.props.iconSize : GlobalIconSize}
        color={this.props.iconColor ? this.props.iconColor : GalleryIconColor}
        // color={'pink'}
        style={styles.favStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  favStyle: {
    elevation: 100,
    borderWidth: 0,
  },
});
export default FavouriteIcon;
