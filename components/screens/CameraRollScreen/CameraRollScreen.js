import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class CameraRollScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fontStyle}>
          {`This is an empty CameraRollScreen app screen...\n start coding...`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CameraRollScreen;
