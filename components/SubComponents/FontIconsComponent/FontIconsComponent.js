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
  backgroundColorArray,
  toolTipColorArray,
} from '../Buttons/index';
// import {AppTour, AppTourView} from 'react-native-app-tour';
import {TouchableOpacity} from 'react-native-gesture-handler';
const BLANK_CAPTION = 'blankCaption';
class FontIconsComponent extends Component {
  state = {
    showFontIcons: this.props.showFontIcons,
    showIconName: this.props.showIconName,
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
            <TouchableOpacity
              key={'3rd icon'}
              ref={ref => {
                if (!ref) return;
                if (this.props.firstLaunch != true) {
                  this.button3 = ref;

                  let props = {
                    order: 14,
                    title: 'Add tags here !',
                    description: `add tags to your photos .. tags help categorize your photos..








                      Touch Screen to close
                `,
                    outerCircleColor: toolTipColorArray[3],
                    // outerCircleColor: '#f24481',
                    cancelable: true,
                    targetRadius: 24,
                  };

                  this.props.addAppTourTarget &&
                    this.props.addAppTourTarget(
                      AppTourView.for(ref, {...props}),
                    );
                }
              }}>
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
                buttonText={this.props.showIconName ? 'Tag' : ''}
              />
            </TouchableOpacity>
          </View>
        )}

        {!this.state.showFontIcons &&
          !this.props.enterTag &&
          this.props.type != BLANK_CAPTION && (
            <FontButton
              iconType="material-community"
              buttonName={'format-size'}
              handleOnPress={this.props.captionSizePressed}
              buttonText={this.props.showIconName ? 'Size' : ''}
            />
          )}
        {!this.state.showFontIcons && !this.props.enterTag && (
          <FontButton
            iconType="material-community"
            buttonName={'format-font'}
            handleOnPress={this.props.captionFontPressed}
            buttonText={this.props.showIconName ? 'Font' : ''}
          />
        )}
        {!this.state.showFontIcons &&
          !this.props.enterTag &&
          this.props.type == BLANK_CAPTION && (
            <FontButton
              iconType="ionicon"
              buttonName={'ios-color-palette'}
              handleOnPress={this.props.changeBackColorPressed}
              buttonText={this.props.showIconName ? 'Color' : ''}
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
