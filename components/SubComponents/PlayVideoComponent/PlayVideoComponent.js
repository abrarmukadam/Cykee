import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PlayOverlay} from '../Buttons/index';
import styles from './styles';
import Video from 'react-native-video';

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
            /* For ExoPlayer */
            /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
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

          <View style={styles.trackingControls}>
            {!this.state.paused && (
              <View style={styles.progress}>
                <View
                  style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
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
