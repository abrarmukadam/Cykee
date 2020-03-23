import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalIconColor, GlobalIconSize, flashIconName} from '../index';

import styles from './styles';

class FlashMode extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressFlashMode()}
        style={styles.FlashModeStyle}>
        <Icon
          name={flashIconName[this.props.flashIcon]}
          //        name="ios-camera"
          size={GlobalIconSize}
          color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default FlashMode;
