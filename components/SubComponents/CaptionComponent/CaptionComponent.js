import React, {Component} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './styles';

import {CAPTION_FONT, CAPTION_SIZE} from '../Buttons/index';

class CaptionComponent extends Component {
  state = {};
  render() {
    const Caption = this.props.caption ? this.props.caption : '';
    if (Caption != '')
      return (
        <SafeAreaView style={[styles.captionContainer, {position: 'relative'}]}>
          <SafeAreaView
            style={[
              styles.captionContainer,
              {
                opacity: 0.6,
                backgroundColor: 'black',
              },
            ]}>
            <Text
              style={[
                styles.captionFont,
                {
                  color: '#0000',
                  fontSize: this.props.captionStyle
                    ? CAPTION_SIZE[this.props.captionStyle.captionSize]
                    : 20,
                  fontFamily: this.props.captionStyle
                    ? CAPTION_FONT[this.props.captionStyle.captionFont]
                    : 'normal',
                },
              ]}>
              {this.props.caption}
            </Text>
          </SafeAreaView>
          <SafeAreaView style={[styles.captionContainer]}>
            <Text
              style={[
                styles.captionFont,
                {
                  color: 'white',
                  fontSize: this.props.captionStyle
                    ? CAPTION_SIZE[this.props.captionStyle.captionSize]
                    : 20,
                  fontFamily: this.props.captionStyle
                    ? CAPTION_FONT[this.props.captionStyle.captionFont]
                    : 'normal',
                },
              ]}>
              {this.props.caption}
            </Text>
          </SafeAreaView>
        </SafeAreaView>
      );
    else
      return (
        <SafeAreaView
          style={[styles.captionContainer, {position: 'relative'}]}
        />
      );
  }
}

export default CaptionComponent;
