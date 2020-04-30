import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalLargeIconSize, CykeeColor} from '../index';
import styles from './styles';

class TakePicture extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity
        style={styles.TakePictureStyle}
        onPress={() => this.props.onTakePicture()}
        onLongPress={() => this.props.onTakeVideo()}>
        <Icon
          name="ios-radio-button-on"
          size={GlobalLargeIconSize}
          color={GlobalIconColor}
          style={
            {
              // position: 'absolute',
              // bottom: 0,
            }
          }
          // color={GlobalIconColor}
        />
        <Icon
          name="ios-radio-button-off"
          size={GlobalLargeIconSize}
          // color={GlobalIconColor}
          style={{
            position: 'absolute',
            bottom: 0,
          }}
          color={CykeeColor}
        />
      </TouchableOpacity>
    );
  }
}

export default TakePicture;
