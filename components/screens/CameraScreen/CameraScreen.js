import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

class CameraScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text> THIS IS CAMERA LAUNCH SCREEN</Text>
      </View>
    );
  }
}

export default CameraScreen;
