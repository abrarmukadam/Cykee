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
  TagComponent,
} from '../Buttons/index';

class FontIconsComponent extends Component {
  state = {
    showFontIcons: this.props.showFontIcons,
    // enterTag: false,
  };
  componentDidMount() {
    console.log('FontIconsComponent DID MOUNT');
  }

  render() {
    console.log('FontIconsComponent Rendered');
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          // borderColor: 'green',
          // borderWidth: 1,
          marginBottom: -4,
        }}>
        {!this.state.showFontIcons && (
          <View style={{flexDirection: 'column-reverse'}}>
            <FontButton
              iconType="material-community"
              buttonName={
                this.props.tagsArray
                  ? 'tag'
                  : this.props.enterTag
                  ? 'tag'
                  : 'tag-outline'
              }
              handleOnPress={this.props.tagPressed}
              buttonText={'Tag'}
            />
          </View>
        )}

        {!this.state.showFontIcons && !this.props.enterTag && (
          <FontButton
            iconType="material-community"
            buttonName={'format-size'}
            handleOnPress={this.props.captionSizePressed}
            buttonText={'Size'}
          />
        )}
        {!this.state.showFontIcons && !this.props.enterTag && (
          <FontButton
            iconType="material-community"
            buttonName={'format-font'}
            handleOnPress={this.props.captionFontPressed}
            buttonText={'Font'}
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
