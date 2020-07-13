import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalMediumIconSize} from '../index';
import styles from './styles';

class CameraType extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressCameraType()}
        style={styles.CameraTypeStyle}
        disabled={this.props.isRecording}>
        <Icon
          name={'md-camera-reverse'}
          size={GlobalMediumIconSize}
          color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default CameraType;
