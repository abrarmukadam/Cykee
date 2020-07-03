import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

class PlayVideoComponent extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fontStyle}>
          {`This is an empty app...\n start coding...`}
        </Text>
      </View>
    );
  }
}

export default PlayVideoComponent;
