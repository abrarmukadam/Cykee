import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class TextMode extends Component {
  render() {
    return (
      <View style={styles.TextModeStyle}>
        <Text style={styles.TextStyle}>
          {this.props.showIconName ? 'Caption Mode' : ''}
        </Text>

        <TouchableOpacity onPress={() => this.props.onPressTextMode()}>
          <Icon
            name={
              this.props.textIcon ? 'closed-caption' : 'closed-caption-outline'
              // this.props.textIcon ? 'closed-caption' : 'closed-caption-outline'
            }
            size={GlobalIconSize}
            color={GlobalIconColor}
            // color={? GlobalIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TextMode;
