import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalLargeIconSize} from '../index';
import styles from './styles';

class TakePicture extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onTakePicture()}
        onLongPress={() => this.props.onTakeVideo()}
        style={styles.TakePictureStyle}>
        <Icon
          name="ios-radio-button-on"
          size={GlobalLargeIconSize}
          color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default TakePicture;
