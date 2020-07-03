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
    paused: true,
  };

  onLoad = data => {
    this.setState({duration: data.duration});
  };

  onProgress = data => {
    this.setState({currentTime: data.currentTime});
  };

  onEnd = () => {
    this.setState({paused: true, currentTime: 0});
    this.props.onPlayPressed(true);
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({paused: true});
  };

  onAudioFocusChanged = (event: {hasAudioFocus: boolean}) => {
    this.setState({paused: !event.hasAudioFocus});
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

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
                paused: !this.state.paused,
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
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls} />

          <View
            style={[
              styles.trackingControls,
              {borderWidth: 1, borderColor: 'red'},
            ]}>
            {!this.state.paused && (
              <View
                style={[
                  styles.progress,
                  {borderWidth: 1, borderColor: 'green'},
                ]}>
                <Icon
                  type="ionicon"
                  name={this.state.paused ? 'ios-play' : 'ios-pause'}
                  size={30}
                  color={'white'}
                  containerStyle={styles.pauseButtonStyle}
                  onPress={() => {
                    this.props.onPlayPressed(!this.state.paused);
                    this.setState({
                      paused: !this.state.paused,
                    });
                  }}
                />

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
              </View>
            )}
          </View>
        </View>
        {this.state.paused && (
          <PlayOverlay
            onPressPlay={() => {
              this.props.onPlayPressed(!this.state.paused);
              this.setState({paused: !this.state.paused});
              console.log('Play video Pressed');
            }}
          />
        )}
      </View>
    );
  }
}

export default PlayVideoComponent;
