import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PlayOverlay, CykeeColor} from '../Buttons/index';
import styles from './styles';
import Video from 'react-native-video';
import {Icon} from 'react-native-elements';

class PlayVideoComponent extends Component {
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: this.props.pauseStatus,
    showIcons: false,
  };

  onLoad = data => {
    this.setState({
      duration: data.duration,
    });
  };

  onProgress = data => {
    this.setState({currentTime: data.currentTime});
  };

  onEnd = () => {
    if (this.state.paused != true) this.props.onVideoComplete();

    this.setState({paused: true, currentTime: 0});
    this.props.onPlayPressed(true);
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({paused: true});
  };

  // onAudioFocusChanged = (event: {hasAudioFocus: boolean}) => {
  //   this.setState({paused: !event.hasAudioFocus});
  // };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }
  // componentDidMount() {
  //   this.setState({pauseStatus: this.props.pauseStatus});
  // }
  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.fullScreen}
          onPress={() => {
            if (!this.state.paused) {
              this.props.onPlayPressed(!this.state.paused);

              this.setState({
                showIcons: !this.state.showIcons,
              });
            }
          }}>
          <Video
            ref={ref => {
              this.video = ref;
            }}
            source={{uri: this.props.video.uri}}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            // onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            height: 100,
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: 'pink',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onPress={() => console.log('pressed pressed pressed')}
        /> */}
        {!this.state.showIcons && (
          <View style={[styles.controls]}>
            {/* <View style={[styles.controls]}> */}
            {/* <View
              style={[
                styles.generalControls,
                // {borderWidth: 1, borderColor: 'red'},
              ]}
            /> */}
            <View
              style={[
                styles.trackingControls,
                // {borderWidth: 1, borderColor: 'red'},
              ]}>
              <TouchableOpacity
                style={[
                  styles.progress,
                  // {borderWidth: 1, borderColor: 'green'},
                ]}
                onPress={position => {
                  console.log(
                    'seekbar pressed:',
                    position.nativeEvent.locationX,
                    position.nativeEvent.locationY,
                  );
                }}>
                <Text style={styles.timeTextStyle}>
                  {Math.floor(this.state.currentTime.toFixed() / 60)}:
                  {this.state.currentTime.toFixed() < 10
                    ? '0' + (this.state.currentTime.toFixed() % 60)
                    : this.state.currentTime.toFixed() % 60}
                </Text>

                <View
                  style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
                />
                <Icon
                  type="font-awesome"
                  name={'circle'}
                  size={12}
                  color={CykeeColor}
                />
                <View
                  style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
                />

                <Text style={styles.timeTextStyle}>
                  {Math.floor(this.state.duration.toFixed() / 60)}:
                  {this.state.duration.toFixed() < 10
                    ? '0' + (this.state.duration.toFixed() % 60)
                    : this.state.duration.toFixed() % 60}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pauseButtonContainer}
                onPress={() => {
                  console.log('pause pressed');
                  this.props.onPlayPressed(!this.state.paused);
                  this.setState({
                    paused: !this.state.paused,
                  });
                  this.video.seek(4);
                }}>
                <Icon
                  type="feather"
                  name={this.state.paused ? 'play-circle' : 'pause-circle'}
                  size={40}
                  color={'white'}
                  containerStyle={styles.pauseButtonStyle}
                />
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>
        )}
      </View>
    );
  }
}

export default PlayVideoComponent;
