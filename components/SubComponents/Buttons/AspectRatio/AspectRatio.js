import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

class AspectRatio extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressAspectRatio()}
        style={styles.AspectRatioStyle}>
        <Text style={styles.TextStyle}>
          {this.props.aspectIcon ? '[4:3]' : '[16:9]'}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default AspectRatio;
