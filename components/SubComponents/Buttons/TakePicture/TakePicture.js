import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalIconColor, GlobalLargeIconSize, CykeeColor} from '../index';
import styles from './styles';

class TakePicture extends Component {
  state = {
    isRecording: false,
  };
  render() {
    return (
      <View style={styles.TakePictureStyle}>
        {this.state.isRecording && (
          <View style={styles.timeContainerStyle}>
            <Text style={styles.timeTextStyle}>00:00</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (this.state.isRecording == false) this.props.onTakePicture();
            else {
              this.setState({isRecording: false});
              this.props.onRecordingStopped();
            }
          }}
          // onLongPress={() => {
          //   this.setState({isRecording: true, inLongPress: true});
          //   this.props.onTakeVideo();
          // }}
          onPressOut={() => {
            this.setState({inLongPress: false});
          }}

          // onLongPress={() => this.props.onTakePicture()}
          //
        >
          <Icon
            name="ios-radio-button-on"
            size={GlobalLargeIconSize}
            color={GlobalIconColor}
            style={
              {
                // position: 'absolute',
                // bottom: 0,
              }
            }
            // color={GlobalIconColor}
          />
          <Icon
            name="ios-radio-button-off"
            size={GlobalLargeIconSize}
            // color={GlobalIconColor}
            style={{
              position: 'absolute',
              bottom: 0,
            }}
            color={this.state.inLongPress ? 'red' : CykeeColor}
          />
          {this.state.isRecording && (
            <Icon
              name="ios-square"
              size={30}
              // color={GlobalIconColor}
              style={{
                position: 'absolute',
                bottom: GlobalLargeIconSize / 2 - 15,
                alignSelf: 'center',
              }}
              color="red"
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default TakePicture;
