import React, {Component} from 'react';
import {GlobalIconSize, GlobalIconColor} from '../index';
import {Icon} from 'react-native-elements';

class TimerButton extends Component {
  state = {};
  render() {
    return (
      <Icon
        name={this.props.timerMode ? 'ios-timer' : 'ios-timer'}
        type="ionicon"
        size={14}
        color={'black'}
        containerStyle={{opacity: 0.5, paddingTop: 15}}
        onPress={() => this.props.onPressMore()}
        reverse
        reverseColor={'white'}
        // raised
      />
    );
  }
}

export default TimerButton;
