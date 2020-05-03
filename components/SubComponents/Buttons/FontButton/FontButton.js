import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  GlobalIconSize,
  CykeeColor,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
} from '../index';

class FontButton extends Component {
  state = {};
  render() {
    return (
      <Icon
        type={this.props.iconType}
        name={this.props.buttonName}
        size={GlobalIconSize - 10}
        color={FONT_ICON_COLOR}
        underlayColor={'black'}
        reverse={true}
        reverseColor={CykeeColor}
        containerStyle={[styles.fontButtonStyle, {opacity: FONT_ICON_OPACITY}]}
        onPress={() => this.props.handleOnPress()}
      />
    );
  }
}

export default FontButton;

const styles = StyleSheet.create({
  fontButtonStyle: {alignItems: 'flex-end', justifyContent: 'flex-end'},
});
