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
  TextMode,
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
  constructor(props) {
    super(props);
  }
  state = {
    cameraType: true,
    textMode: true,
    photo: null,
  };

  componentDidMount() {}

  takePicture = async function(camera) {
    console.log('CLICK CLICK');
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    data.name = 'amazing.jpg';
    this.setState({photo: data});

    if (this.state.textMode)
      this.props.navigation.navigate('PreviewScreen', {photo: data});
    else CameraRoll.save(data.uri, {type: 'photo', album: 'Cykee'});
    // console.log(data.name);

    // CameraRoll.save(data.uri, {type: 'photo', album: 'Cykee'});
    // CameraRoll.saveToCameraRoll(data.uri);
  };

  changeFlashMode = () => {
    //"FlashMode": {"auto": 3, "off": 0, "on": 1, "torch": 2}
    console.log(this.props.flashMode);
    if (this.props.flashMode < 3)
      this.props.changeFlashMode(this.props.flashMode + 1);
    else this.props.changeFlashMode(0);
  };
  changeCameraType = () => {};
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          // type={RNCamera.Constants.Type.back}
          type={this.state.cameraType ? 0 : 1} //back:0 , front:1
          flashMode={this.props.flashMode}
          autoFocus={true}
          onPictureTaken={() => console.log('onPictureTaken')}
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
              <View style={styles.bottomContainer}>
                <GalleryIcon
                  onPressGalleryIcon={() => console.log('GalleryIcon Pressed')}
                />
                <TakePicture onTakePicture={() => this.takePicture(camera)} />
                <FlashMode
                  flashIcon={this.props.flashMode}
                  onPressFlashMode={() => this.changeFlashMode()}
                />
                <CameraType
                  onPressCameraType={() =>
                    this.setState({cameraType: !this.state.cameraType})
                  }
                />
                <TextMode
                  textIcon={this.state.textMode}
                  onPressTextMode={() =>
                    this.setState({textMode: !this.state.textMode})
                  }
                />
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

export default CameraScreen;
