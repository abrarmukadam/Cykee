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
  AspectRatio,
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

  takePicture = async function () {
    console.log('CLICK CLICK');
    const options = {quality: 1, base64: true};
    const asp = await this.camera.getSupportedRatiosAsync();
    //[1:1 , 4:3, 16:9, 48:23]
    console.log('asp:', asp);

    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    // console.log(data.uri);
    // this.setState({photo: data});

    if (this.props.textMode)
      this.props.navigation.navigate('PreviewScreen', {photo: data});
    else {
      let newPhoto = {};
      const temp = data.uri.split('/');
      console.log('Photo saved in gallery');
      CameraRoll.save(data.uri, {
        type: 'photo',
        album: 'Cykee',
      }).then((uri) => console.log('uri uri uri:', uri));
      newPhoto.height = data.height;
      newPhoto.width = data.width;
      let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
      newPhoto.fileName = temp[temp.length - 1];
      newPhoto.caption = '';
      newPhoto.uri = galleryUri + newPhoto.fileName;
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

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => (this.camera = ref)}
          fixOrientation={false}
          style={[
            styles.preview,
            {height: this.props.aspectRatio ? '75%' : '100%'},
          ]}
          type={this.props.cameraType ? 0 : 1} //back:0 , front:1
          flashMode={this.props.flashMode}
          ratio={this.props.aspectRatio ? '4:3' : '16:9'}
          autoFocus={true}
          // onCameraReady={this.getCameraRatio}
          onPictureTaken={() => console.log('onPictureTaken')}
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
              <View style={styles.CameraIconContainer}>
                <FlashMode
                  flashIcon={this.props.flashMode}
                  onPressFlashMode={() => this.changeFlashMode()}
                />
                <TextMode
                  textIcon={this.props.textMode}
                  onPressTextMode={() =>
                    this.props.changeTextMode(!this.props.textMode)
                  }
                />

                <AspectRatio
                  aspectIcon={this.props.aspectRatio}
                  onPressAspectRatio={() =>
                    this.props.changeAspectRatio(!this.props.aspectRatio)
                  }
                />
              </View>
            );
          }}
        </RNCamera>
        <View style={styles.bottomContainer}>
          <GalleryButton
            onPressGalleryIcon={() =>
              this.props.navigation.navigate('GalleryScreen')
            }
          />
          <TakePicture onTakePicture={() => this.takePicture()} />
          <CameraType
            onPressCameraType={() =>
              this.props.changeCameraType(!this.props.cameraType)
            }
          />
        </View>
      </View>
    );
  }
}

export default CameraScreen;
