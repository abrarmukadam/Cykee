import React, {PureComponent} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  StatusBar,
  BackHandler,
  Platform,
} from 'react-native';
import styles from './styles';
import {RNCamera} from 'react-native-camera';
import GalleryButton from './../../SubComponents/GalleryButton/GalleryButton';
import CameraRoll from '@react-native-community/cameraroll';
import VolumeControl, {VolumeControlEvents} from 'react-native-volume-control';
var RNFS = require('react-native-fs');
import SplashScreen from 'react-native-splash-screen';

import {
  TakePicture,
  FlashMode,
  CameraType,
  TextMode,
  AspectRatio,
  GalleryIcon,
} from './../../SubComponents/Buttons/index';
import GestureRecognizer from 'react-native-swipe-gestures';

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
class CameraScreen extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    asp: undefined,
    remountCamera: false,

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
  componentDidUpdate() {
    if (this.state.remountCamera) {
      // PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // );
      setTimeout(() => {
        this.setState({remountCamera: false});
        SplashScreen.hide();
      }, 100);
    }
  }
  async componentDidMount() {
    console.log('MOUNTED');
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    // PermissionsAndroid.requestMultiple([
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    // ]);

    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   {
    //     title: 'AndoridPermissionExample App Camera Permission',
    //     message: 'AndoridPermissionExample App needs access to your camera ',
    //   },
    // );

    // this.camera.refreshAuthorizationStatus();
    const ratios = await this.camera.getSupportedRatiosAsync();
    console.log('this.props.aspectRatio', this.props.aspectRatio);

    this.setState({
      volume: await VolumeControl.getVolume(),
      asp: ratios[ratios.length - 1],
    });
    console.log(ratios[ratios.length - 1]);

    this.volEvent = VolumeControlEvents.addListener(
      'VolumeChanged',
      this.volumeEvent,
    );

    SplashScreen.hide();
  }
  volumeEvent = event => {
    console.log('volume event ');
    if (this.state.volume >= event.volume) this.takePicture();

    this.setState({volume: event.volume});
  };

  componenDidUnmount() {
    // remove event listener
    console.log('CameraScreen unmount');
    this.volEvent.remove();
  }
  onPressGallery = () => {
    this.props.navigation.navigate('GalleryTab');
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
      const d = new Date();
      const newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;
      let nameToChange = temp[temp.length - 1];
      let renamedURI = data.uri.replace(nameToChange, newName);
      RNFS.copyFile(data.uri, renamedURI).then(() => {
        CameraRoll.save(renamedURI, {
          // CameraRoll.save(data.uri, {
          type: 'photo',
          album: 'Cykee',
        }).then(uri => {
          console.log('uri:', uri);
          newPhoto.height = data.height;
          newPhoto.width = data.width;
          let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
          newPhoto.fileName = newName;
          newPhoto.caption = '';
          newPhoto.uri = galleryUri + newPhoto.fileName;
          // newPhoto.uri = uri;
          console.log('Photo saved in gallery:', newPhoto);
          this.props.addNewPhoto(newPhoto);
        });
      });
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
    let intervalId = setTimeout(() => {
      console.log('this will run after 2 seconds');
      this.setState({
        focus: false,
      });
      clearInterval(intervalId);
    }, 2000);
  };
  onPressGalleryIcon = () =>
    this.props.navigation.navigate('GalleryScreen', {
      index: 0,
      toBeDisplayed: this.props.photoArray,
    });

  getCameraRatio = async () => {
    if (!this.state.asp && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      this.setState({
        asp: ratios[ratios.length - 1],
        remountCamera: true,
      });
    }
  };
  render() {
    console.log('Camera Screen Rendered');
    console.log(this.state.asp);
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
        // onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={() => this.props.navigation.navigate('GalleryTab')}
        onSwipeDown={() => BackHandler.exitApp()}
        onSwipeRight={() => this.onPressGalleryIcon()}
        config={config}
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          <StatusBar hidden={true} />

          {!this.state.remountCamera && (
            <RNCamera
              ref={ref => (this.camera = ref)}
              style={[
                styles.preview,
                {
                  height: this.props.aspectRatio ? '75%' : '100%',
                },
              ]}
              type={this.props.cameraType ? 0 : 1} //back:0 , front:1
              flashMode={this.props.flashMode}
              onCameraReady={this.getCameraRatio}
              ratio={
                // this.state.asp
                this.props.aspectRatio ? '4:3' : this.state.asp
              }
              onStatusChange={status => {
                console.log('STATUS CHANGE:', status);
                console.log('this.state.asp:', this.state.asp);
              }}
              autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
              defaultOnFocusComponent={true}
              autoFocus={true}
              onPictureTaken={() => console.log('onPictureTaken')}>
              {({camera, status, recordAudioPermissionStatus}) => {
                if (status !== 'READY') {
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
          )}
          <View style={styles.bottomContainer}>
            <GalleryButton
              photo_uri={
                this.props.photoArray[0] ? this.props.photoArray[0].uri : ''
              }
              onPressGalleryIcon={() => this.onPressGalleryIcon()}
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
      </GestureRecognizer>
    );
  }
}

export default CameraScreen;
