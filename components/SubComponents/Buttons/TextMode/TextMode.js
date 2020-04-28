import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class TextMode extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressTextMode()}
        style={styles.TextModeStyle}>
        <Icon
          name={
            // this.props.textIcon ? 'closed-caption' : 'closed-caption-outline'
            this.props.textIcon
              ? 'comment-check-outline'
              : 'comment-remove-outline'
          }
          size={GlobalIconSize}
          color={GlobalIconColor}
          // color={? GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default TextMode;
