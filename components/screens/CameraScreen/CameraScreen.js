import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {RNCamera} from 'react-native-camera';

import CameraRoll from '@react-native-community/cameraroll';

import {
  TakePicture,
  FlashMode,
  CameraType,
  GalleryIcon,
} from './../../SubComponents/Buttons/index';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);
class CameraScreen extends Component {
  state = {
    flashMode: 3, //AutoFlash
    cameraType: false,
  };

  componentDidMount() {}

  takePicture = async function(camera) {
    console.log('CLICK CLICK');
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    data.name = 'amazing.jpg';
    // console.log(data.name);
    CameraRoll.save(data.uri, {type: 'photo', album: 'Cykee'});
    // CameraRoll.saveToCameraRoll(data.uri);
  };

  changeFlashMode = () => {
    //"FlashMode": {"auto": 3, "off": 0, "on": 1, "torch": 2}
    if (this.state.flashMode < 3)
      this.setState({flashMode: this.state.flashMode + 1});
    else this.setState({flashMode: 0});
  };
  changeCameraType = () => {
    this.setState({cameraType: !this.state.cameraType});
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          // type={RNCamera.Constants.Type.back}
          type={this.state.cameraType ? 0 : 1} //back:0 , front:1
          flashMode={
            this.state.flashMode
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 1,
                  opacity: 0.6,
                  height: '100%',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                }}>
                <GalleryIcon
                  onPressGalleryIcon={() => console.log('GalleryIcon Pressed')}
                />
                <TakePicture onTakePicture={() => this.takePicture(camera)} />
                <FlashMode
                  flashIcon={this.state.flashMode}
                  onPressFlashMode={() => this.changeFlashMode()}
                />
                <CameraType onPressCameraType={() => this.changeCameraType()} />
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

export default CameraScreen;
