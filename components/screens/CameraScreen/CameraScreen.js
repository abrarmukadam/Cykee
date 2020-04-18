import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  Slider,
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
    focus: false,
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
  };

  async componentDidMount() {
    console.log('MOUNTED');
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
  }
  volumeEvent = event => {
    console.log('volume event ');
    if (this.state.volume >= event.volume) this.takePicture();

    this.setState({volume: event.volume});
  };
  componentWillMount() {
    console.log('Component will mount called for Camera Screen');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('CameraScreen did update called');
  }
  componentWillUnmount() {
    // remove event listener
    console.log('CameraScreen unmount');
    this.volEvent.remove();
  }
  onPressGallery = () => {
    this.props.navigation.navigate('GridViewScreen');
    // this.setState({index: 0});
    console.log('Gallery Pressed');
  };
  takeVideo = async () => {
    console.log('take video');
  };
  takePicture = async () => {
    const options = {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      fixOrientation: true,
      volume: 0,
      pauseAfterCapture: true,
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
    this.camera.resumePreview();
    this.setState({focus: false});
  };

  changeFlashMode = () => {
    //"FlashMode": {"auto": 3, "off": 0, "on": 1, "torch": 2}
    if (this.props.flashMode < 3)
      this.props.changeFlashMode(this.props.flashMode + 1);
    else this.props.changeFlashMode(0);
  };

  touchToFocus = event => {
    const {pageX, pageY} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      focus: true,
      autoFocusPoint: {
        normalized: {x, y},
        drawRectPosition: {x: pageX, y: pageY},
      },
    });
  };

  render() {
    console.log('Camera Screen Rendered');
    console.log(this.state.autoFocusPoint);
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
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
          autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
          // autoFocusPointOfInterest={{x: 1, y: 1}}

          defaultOnFocusComponent={true}
          // defaultTouchToFocus
          // onFocusChanged={() => this._handleFocusChanged()}
          autoFocus={true}
          zoom={this.state.zoom}
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
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              );
              console.log('NOT READY');
              return <PendingView />;
            }
            return (
              <View style={StyleSheet.absoluteFill}>
                <View
                  style={[
                    styles.autoFocusBox,
                    drawFocusRingPosition,
                    {borderColor: this.state.focus ? 'white' : '#0000'},
                  ]}
                />

                <TouchableWithoutFeedback
                  onPress={event => this.touchToFocus(event)}>
                  <View style={{flex: 1}} />
                </TouchableWithoutFeedback>
                <View style={styles.CameraIconContainer}>
                  {/* <View style={[styles.autoFocusBox]} /> */}
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
              </View>
            );
          }}
        </RNCamera>
        <View style={styles.bottomContainer}>
          <GalleryButton
            photo_uri={
              this.props.photoArray[0] ? this.props.photoArray[0].uri : ''
            }
            onPressGalleryIcon={() =>
              this.props.navigation.navigate('GalleryScreen', {index: 0})
            }
          />
          <TakePicture
            onTakePicture={() => this.takePicture()}
            onTakeVideo={() => this.takeVideo()}
          />
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
