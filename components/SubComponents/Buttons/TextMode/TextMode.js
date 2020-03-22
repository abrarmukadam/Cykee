import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class TextMode extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressTextMode()}
        style={styles.TextModeStyle}>
        <Icon
          name={this.props.textIcon ? 'comment' : 'comment-slash'}
          size={GlobalIconSize}
          color={GlobalIconColor}
          // color={? GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default TextMode;
