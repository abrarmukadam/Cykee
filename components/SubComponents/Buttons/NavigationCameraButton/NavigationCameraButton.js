import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
} from 'react-native';
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  CykeeColor,
  TakePicture,
  GlobalLargeIconSize,
  GlobalIconColor,
} from '../index';
class NavigationCameraButton extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableHighlight
          onPress={() => console.log('presspress')}
          underlayColor="yellow"> */}
        <Icon
          name="ios-remove-circle"
          size={GlobalLargeIconSize}
          color={'grey'}
          //   color={'silver'}
          style={[styles.button, {opacity: 0.7}]}
          // color={GlobalIconColor}
        />
        <Icon
          name="ios-radio-button-on"
          size={GlobalLargeIconSize}
          color={GlobalIconColor}
          //   color={'silver'}
          style={[styles.button, {opacity: 1}]}
          // color={GlobalIconColor}
        />

        <Icon
          name="ios-radio-button-off"
          size={GlobalLargeIconSize}
          // color={GlobalIconColor}
          style={[styles.button]}
          color={CykeeColor}
        />

        {/* <Icon
          type="font-awesome"
          name="camera"
          size={24}
          color={CykeeColor}
          containerStyle={styles.button}
          //   iconStyle={styles.button}
          underlayColor="yellow"
        /> */}
        {/* </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    top: -60,
    right: -40,
    // opacity: 0.7,
    // borderWidth: 4,
    // borderColor: 'red',
    // shadowRadius: 5,
    // shadowColor: '#7f58ff',
    // shadowOffset: {height: 10},
    // shadowOpacity: 0.3,
  },
  //   container: {backgroundColor: 'pink', borderColor: 'red', borderWidth: 2},
});

export default NavigationCameraButton;
