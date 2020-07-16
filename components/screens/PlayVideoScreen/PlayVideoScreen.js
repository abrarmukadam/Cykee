import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  PlayVideoComponent,
  GlobalIconSize,
} from '../../SubComponents/Buttons/index';
import {Icon} from 'react-native-elements';

class PlayVideoScreen extends Component {
  state = {
    pauseStatus: false,
  };

  leftHeaderButton = (
    <TouchableOpacity
      onPress={() => this.props.navigation.goBack()}
      style={{
        marginLeft: 20,
      }}>
      <View
        style={{
          backgroundColor: 'grey',
          paddingHorizontal: 7,
          borderRadius: 20,
          opacity: 0.4,
        }}>
        {/* <Icon
          type="feather"
          name="arrow-left"
          size={GlobalIconSize}
          color={'white'}
          underlayColor={'#0000'}
        /> */}
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
          underlayColor={'#0000'}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 7,
          borderRadius: 20,
          position: 'absolute',
        }}>
        {/* <Icon
          type="feather"
          name="arrow-left"
          size={GlobalIconSize}
          color={'white'}
          underlayColor={'#0000'}
        /> */}
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
          underlayColor={'#0000'}
        />
      </View>
    </TouchableOpacity>
  );
  componentDidMount() {
    // this.props.navigation.setOptions({
    //   headerLeft: () => this.leftHeaderButton,
    // });
  }
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}>
        <PlayVideoComponent
          video={this.props.route.params.video}
          pauseStatus={this.state.pauseStatus}
          onPlayPressed={pauseStatus => {
            console.log('play pressed in PlayVideoScreen');
            this.setState({
              optionsAvailable: pauseStatus,
              // showCapion: pauseStatus,
            });
            // showCapion;
          }}
          onVideoComplete={() => {
            console.log('going back');
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PlayVideoScreen;
