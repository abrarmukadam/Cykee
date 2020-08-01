import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalMediumIconSize} from '../index';
import styles from './styles';
// import {Icon} from 'react-native-elements';

class CameraType extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressCameraType()}
        style={styles.CameraTypeStyle}
        disabled={this.props.isRecording}>
        <Icon
          name={'ios-reverse-camera'}
          // name={'md-camera-reverse'}
          // name={'md-camera-reverse-sharp'}
          // type={'ionicon'}
          size={GlobalMediumIconSize}
          color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default CameraType;
