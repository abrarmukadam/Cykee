import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  GlobalIconSize,
  CykeeColor,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
  SIDE_ICON_COLOR,
} from '../index';

class EditScreenButton extends Component {
  state = {};
  render() {
    return (
      <Icon
        type={this.props.iconType}
        name={this.props.iconName}
        size={GlobalIconSize - 10}
        color={SIDE_ICON_COLOR}
        underlayColor={'black'}
        reverse={true}
        reverseColor={CykeeColor}
        containerStyle={[
          styles.sideButtonStyle,
          {top: this.props.topPosition, opacity: FONT_ICON_OPACITY},
        ]}
        onPress={() => this.props.handleOnPress()}
      />
    );
  }
}

export default EditScreenButton;

const styles = StyleSheet.create({
  sideButtonStyle: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
});
