import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class CameraType extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressCameraType()}
        style={styles.CameraTypeStyle}>
        <Icon
          name={'ios-reverse-camera'}
          size={GlobalIconSize}
          color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default CameraType;
