import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class GalleryIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressGalleryIcon()}
        style={styles.GalleryIconStyle}>
        <Icon
          name={'ios-images'}
          size={GlobalIconSize}
          color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default GalleryIcon;
