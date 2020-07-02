import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

class BlankCaptionDisplay extends Component {
  state = {};
  render() {
    console.log('captionStyle:', this.props.captionFont);

    return (
      <View
        style={[
          styles.container,
          //       //    {backgroundColor: this.props.backColor}
        ]}>
        <Text style={[styles.fontStyle, {fontFamily: this.props.captionFont}]}>
          {this.props.caption}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    // flex: 1,
    // position: 'absolute',
    // bottom: HEIGHT / 2 - 50,
    // left: WIDTH / 2 - 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'yellow',
    // borderWidth: 1,
    // backgroundColor: 'red',
  },
  fontStyle: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    // fontWeight: '700',
    margin: 4,
  },
});

export default BlankCaptionDisplay;
