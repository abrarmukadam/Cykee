import React, {Component} from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import {GlobalIconColor, GlobalIconSize} from './../Buttons/index';

class PreviewImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.photo.uri}} style={styles.image} />
        <Icon
          name="ios-close"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.crossButtonStyle}
        />
        <Icon
          name="md-send"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.saveButtonStyle}
        />
      </View>
    );
  }
}

export default PreviewImage;
