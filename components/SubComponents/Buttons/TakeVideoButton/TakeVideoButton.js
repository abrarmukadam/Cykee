import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {GlobalIconColor, GlobalIconSize, CykeeColor} from '../index';

class TakeVideoButton extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity
        style={{marginBottom: 30, alignItems: 'center'}}
        // onPress={() => this.props.onTakePicture()}
        // onLongPress={() => this.props.onTakeVideo()}
        // onLongPress={() => this.props.onTakePicture()}
        //
      >
        <Icon
          name="record"
          size={GlobalIconSize}
          color="red"
          style={
            {
              // position: 'absolute',
              // bottom: 0,
            }
          }
          // color={GlobalIconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default TakeVideoButton;
