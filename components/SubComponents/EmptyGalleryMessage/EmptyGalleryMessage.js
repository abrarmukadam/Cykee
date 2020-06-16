import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TEXT_BUTTON_COLOR} from '../Buttons/index';

class EmptyGalleryMessage extends Component {
  state = {};
  render() {
    return (
      <View style={styles.emptyScreenTextContainer}>
        <Text style={styles.emptyScreenTextStyle}>
          {`...Go ahead, create your 
          memories ! ! !`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyScreenTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: TEXT_BUTTON_COLOR,
    fontFamily: 'times-roman',
    // fontFamily: 'caveat-regular',
    // fontFamily: 'amatic-regular',
  },
});

export default EmptyGalleryMessage;
