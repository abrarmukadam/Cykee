import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import styles from './styles';
import {
  FontButton,
  CykeeColor,
  GlobalIconSize,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
} from '../Buttons/index';

class FontIconsComponent extends Component {
  state = {
    showFontIcons: this.props.showFontIcons,
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        {!this.state.showFontIcons && (
          <FontButton
            iconType="material-community"
            buttonName={'format-size'}
            handleOnPress={this.props.captionSizePressed}
          />
        )}
        {!this.state.showFontIcons && (
          <FontButton
            iconType="material-community"
            buttonName={'format-font'}
            handleOnPress={this.props.captionFontPressed}
          />
        )}
        <Icon
          type={'entypo'}
          name={
            this.state.showFontIcons
              ? 'chevron-small-right'
              : 'chevron-small-left'
          }
          size={GlobalIconSize - 10}
          color={this.state.showFontIcons ? FONT_ICON_COLOR : '#0000'}
          reverseColor={CykeeColor}
          reverse
          containerStyle={{
            opacity: FONT_ICON_OPACITY,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: this.state.showFontIcons ? 0 : -10,
          }}
          onPress={() =>
            this.setState({
              showFontIcons: !this.state.showFontIcons,
            })
          }
        />
      </View>
    );
  }
}

export default FontIconsComponent;
