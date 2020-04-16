import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import {GlobalIconColor, GlobalIconSize} from '../index';

class AspectRatio extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressAspectRatio()}
        style={styles.AspectRatioStyle}>
        <Icon
          name={this.props.aspectIcon ? 'resize-full-screen' : 'resize-100-'}
          size={GlobalIconSize}
          color={GlobalIconColor}
        />
        {/* <Text style={styles.TextStyle}>
          {this.props.aspectIcon ? '[4:3]' : '[16:9]'}
        </Text> */}
      </TouchableOpacity>
    );
  }
}

export default AspectRatio;
