import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {RNCamera} from 'react-native-camera';
import GalleryButton from './../../SubComponents/GalleryButton/GalleryButton';
import CameraRoll from '@react-native-community/cameraroll';
import VolumeControl, {VolumeControlEvents} from 'react-native-volume-control';

import {
  TakePicture,
  FlashMode,
  CameraType,
  TextMode,
  AspectRatio,
  GalleryIcon,
} from './../../SubComponents/Buttons/index';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

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
  state = {
    asp: ['16:9'],
    options: {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      fixOrientation: true,
      volume: 0,
    },
  };

  async componentDidMount() {
    this.setState({
      volume: await VolumeControl.getVolume(),
      asp: await this.camera.getSupportedRatiosAsync(),
    });
    // this.camera.getSupportedRatiosAsync().then(temp => {
    //   this.setState({asp: temp});
    // });
    this.volEvent = VolumeControlEvents.addListener(
      'VolumeChanged',
      this.volumeEvent,
    );
    console.log('MOUNTED');
  }
  volumeEvent = event => {
    console.log('volume event ');
    if (this.state.volume >= event.volume) this.takePicture();

    this.setState({volume: event.volume});
  };
  componentWillUnmount() {
    // remove event listener
    this.volEvent.remove();
  }
  onPressGallery = () => {
    this.props.navigation.navigate('GridViewScreen');
    // this.setState({index: 0});
    console.log('Gallery Pressed');
  };

  takePicture = async function() {
    const options = {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      fixOrientation: true,
      volume: 0,
      // pauseAfterCapture: true,
      mirrorImage: this.props.cameraType ? false : true, //0 = back , 1 = front
    };
    console.log('CLICK CLICK');
    // const cam_options = this.state.options;
    // cam_options.mirrorImage = this.props.cameraType ? false : true; //0 = back , 1 = front
    const data = await this.camera.takePictureAsync(options);

    if (this.props.textMode)
      this.props.navigation.navigate('PreviewScreen', {photo: data});
    else {
      let newPhoto = {};
      const temp = data.uri.split('/');
      console.log('Photo saved in gallery');
      CameraRoll.save(data.uri, {
        type: 'photo',
        album: 'Cykee',
      }).then(uri => console.log('uri:', uri));
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
    console.log('asp:', this.state.asp[this.state.asp.length - 1]);
    console.log('volume:', this.state.volume);
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => (this.camera = ref)}
          // fixOrientation={false}
          style={[
            styles.preview,
            {height: this.props.aspectRatio ? '75%' : '100%'},
          ]}
          type={this.props.cameraType ? 0 : 1} //back:0 , front:1
          flashMode={this.props.flashMode}
          ratio={
            this.props.aspectRatio
              ? '4:3'
              : this.state.asp[this.state.asp.length - 1]
          }
          autoFocusPointOfInterest={{x: 1, y: 1}}
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
            if (status !== 'READY') {
              console.log('NOT READY');
              return <PendingView />;
            }
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
                <TouchableOpacity
                  onPress={() => this.onPressGallery()}
                  style={{marginTop: 10}}>
                  <GalleryIcon iconColor="white" />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
        <View style={styles.bottomContainer}>
          <GalleryButton
            photo_uri={this.props.photoArray[0].uri}
            onPressGalleryIcon={() =>
              this.props.navigation.navigate('GalleryScreen', {index: 0})
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
