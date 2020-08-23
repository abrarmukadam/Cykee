import React, {Component} from 'react';
import {GlobalIconSize, GlobalIconColor, CykeeColor} from '../index';
import {Icon} from 'react-native-elements';

class MoreIcon extends Component {
  state = {};
  render() {
    return (
      <Icon
        name={this.props.expandOptions ? 'closecircleo' : 'upcircleo'}
        type="antdesign"
        size={30}
        color={this.props.expandOptions ? 'white' : 'white'}
        containerStyle={{paddingBottom: 15, opacity: 0.7}}
        onPress={() => this.props.onPressMore()}
        reverseColor={'white'}
        underlayColor={'#0000'}
      />
    );
  }
}

export default MoreIcon;
