import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconSize, GalleryIconColor} from '../index';
import {TouchableOpacity} from 'react-native';
class BackButton extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPressBack()}>
        <Icon
          name="md-arrow-back"
          size={GlobalIconSize}
          color={GalleryIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default BackButton;
