import React, {Component} from 'react';
import {GlobalIconSize, GalleryIconColor, CykeeColor} from '../index';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
class TagIcon extends Component {
  state = {};
  render() {
    // fav_status = this.props.fav_status ? this.props.fav_status : false;
    return (
      <Icon
        // name={this.props.fav_status ? 'tago' : 'heart-outlined'}
        name={'tago'}
        // color={this.props.fav_status ? 'grey' : 'white'}
        size={this.props.iconSize ? this.props.iconSize : GlobalIconSize}
        color={'white'}
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
export default TagIcon;
