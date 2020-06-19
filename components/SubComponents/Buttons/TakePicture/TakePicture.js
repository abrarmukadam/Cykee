import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';
import {GlobalIconColor, GlobalLargeIconSize, CykeeColor} from '../index';
import styles from './styles';
import moment from 'moment';

class TakePicture extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isRecording: false,
    // recordingTime: 0,
  };
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isRecording != this.state.isRecording)
      if (this.state.isRecording == true) {
        this.setState({recordingTime: 1});
        this.recordingTimer = setInterval(
          () => this.setState({recordingTime: this.state.recordingTime + 1}),
          1000,
        );
      } else {
        clearInterval(this.recordingTimer);
        this.setState({recordingTime: 0});
      }
  }
  render() {
    console.log('Min:', Math.floor(this.state.recordingTime / 60));
    console.log('Sec:', this.state.recordingTime % 60);
    return (
      <View style={styles.TakePictureStyle}>
        {this.state.isRecording && (
          <View style={styles.timeContainerStyle}>
            <Icon type="font-awesome" name="circle" size={10} color="red" />
            <Text style={styles.timeTextStyle}>
              {Math.floor(this.state.recordingTime / 60)}:
              {this.state.recordingTime < 10
                ? '0' + (this.state.recordingTime % 60)
                : this.state.recordingTime % 60}
            </Text>
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
          onLongPress={() => {
            this.setState({isRecording: true, inLongPress: true});
            this.props.onTakeVideo();
          }}
          onPressOut={() => {
            this.setState({inLongPress: false});
          }}

          // onLongPress={() => this.props.onTakePicture()}
          //
        >
          <Icon
            type="ionicon"
            name="ios-radio-button-on"
            size={GlobalLargeIconSize}
            color={GlobalIconColor}
            containerStyle={
              {
                // position: 'absolute',
                // bottom: 0,
              }
            }
            // color={GlobalIconColor}
          />
          <Icon
            type="ionicon"
            name="ios-radio-button-off"
            size={GlobalLargeIconSize}
            // color={GlobalIconColor}
            containerStyle={{
              position: 'absolute',
              bottom: 0,
            }}
            color={this.state.inLongPress ? 'red' : CykeeColor}
          />
          {this.state.isRecording && (
            <Icon
              type="ionicon"
              name="ios-square"
              size={30}
              // color={GlobalIconColor}
              containerStyle={{
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
