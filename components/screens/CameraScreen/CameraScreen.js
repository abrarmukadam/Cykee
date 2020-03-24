import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from './styles';
import {RNCamera} from 'react-native-camera';
import GalleryButton from './../../SubComponents/GalleryButton/GalleryButton';
import CameraRoll from '@react-native-community/cameraroll';

import {
  TakePicture,
  FlashMode,
  CameraType,
  TextMode,
} from './../../SubComponents/Buttons/index';

const PendingView = () => (
  <View
    style={{
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator />
  </View>
);
class CameraScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  componentDidMount() {}

  takePicture = async function(camera) {
    console.log('CLICK CLICK');
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    // this.setState({photo: data});

    if (this.props.textMode)
      this.props.navigation.navigate('PreviewScreen', {photo: data});
    else {
      let newPhoto = [];
      const temp = data.uri.split('/');
      console.log('Photo saved in gallery');
      CameraRoll.save(data.uri, {
        type: 'photo',
        album: 'Cykee',
      });
      newPhoto.galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
      newPhoto.fileName = temp[temp.length - 1];
      newPhoto.caption = '';
      newPhoto.uri = newPhoto.galleryUri + newPhoto.fileName;
      console.log('Photo saved in gallery:', newPhoto);
      this.props.addNewPhoto(newPhoto);
    }
  };

  changeFlashMode = () => {
    //"FlashMode": {"auto": 3, "off": 0, "on": 1, "torch": 2}
    if (this.props.flashMode < 3)
      this.props.changeFlashMode(this.props.flashMode + 1);
    else this.props.changeFlashMode(0);
  };
  changeCameraType = () => {};
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          // type={RNCamera.Constants.Type.back}
          type={this.props.cameraType ? 0 : 1} //back:0 , front:1
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
                <GalleryButton
                //      onPressGalleryIcon={() => console.log('GalleryIcon Pressed')}
                />
                <TakePicture onTakePicture={() => this.takePicture(camera)} />
                <FlashMode
                  flashIcon={this.props.flashMode}
                  onPressFlashMode={() => this.changeFlashMode()}
                />
                <CameraType
                  onPressCameraType={() =>
                    this.props.changeCameraType(!this.props.cameraType)
                  }
                />
                <TextMode
                  textIcon={this.props.textMode}
                  onPressTextMode={() =>
                    this.props.changeTextMode(!this.props.textMode)
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
