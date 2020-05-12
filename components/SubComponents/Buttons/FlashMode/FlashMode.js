import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalIconColor, GlobalIconSize, flashIconName} from '../index';

import styles from './styles';

class FlashMode extends Component {
  render() {
    return (
      <View style={styles.FlashModeStyle}>
        <Text style={styles.TextStyle}>
          {this.props.showIconName ? 'Flash' : ''}
        </Text>
        <TouchableOpacity onPress={() => this.props.onPressFlashMode()}>
          <Icon
            name={flashIconName[this.props.flashIcon]}
            size={GlobalIconSize}
            color={GlobalIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FlashMode;
