import React, {Component} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './styles';
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
                opacity: 0.4,
                backgroundColor: 'black',
              },
            ]}>
            <Text style={[styles.captionFont, {color: '#0000'}]}>
              {this.props.caption}
            </Text>
          </SafeAreaView>
          <SafeAreaView style={[styles.captionContainer]}>
            <Text style={styles.captionFont}>{this.props.caption}</Text>
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
