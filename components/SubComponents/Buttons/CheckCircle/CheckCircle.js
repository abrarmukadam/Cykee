import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconSize, GalleryIconColor} from '../index';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {CykeeColor} from '../index';
class CheckCircle extends Component {
  state = {};
  render() {
    return (
      //   <TouchableOpacity style={styles.container}>
      <Icon
        name="ios-checkmark-circle"
        size={this.props.iconSize ? this.props.iconSize : 40}
        color={CykeeColor}
      />
      //   </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    // position: 'absolute',
    // bottom: 160,
    // right: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CheckCircle;
