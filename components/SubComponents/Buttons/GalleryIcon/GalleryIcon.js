import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GalleryIconColor, GlobalIconSize} from '../index';
import styles from './styles';
class GalleryIcon extends Component {
  render() {
    return (
      <Icon
        name={this.props.selectedStatus ? 'md-images' : 'md-images'}
        size={GlobalIconSize}
        color={this.props.iconColor ? this.props.iconColor : GalleryIconColor}
        // style={styles.GalleryIconStyle}
      />
    );
  }
}

export default GalleryIcon;
