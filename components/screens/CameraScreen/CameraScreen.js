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
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {BlurView} from '@react-native-community/blur';

import {
  TakePicture,
  FlashMode,
  CameraType,
  TextMode,
  AspectRatio,
  GalleryIcon,
  CykeeColor,
  TAB_BAR_COLOR,
  MoreIcon,
  BACKGROUND_COLOR,
} from './../../SubComponents/Buttons/index';
import GestureRecognizer from 'react-native-swipe-gestures';
const PendingView = () => (
  <View
    style={{
      flex: 1,
      // backgroundColor: {BACKGROUND_COLOR},
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <StatusBar backgroundColor={'transparent'} translucent />

    {/* <UIActivityIndicator color={'#0000'} /> */}
    <UIActivityIndicator color={CykeeColor} />
  </View>
);
const BlurLoadingView = () => (
  <BlurView
    style={StyleSheet.absoluteFill}
    blurType="light"
    blurAmount={30}
    reducedTransparencyFallbackColor={CykeeColor}
  />
);
class CameraScreen extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    remountCamera: false,
    options: {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      fixOrientation: true,
      volume: 0,
      showIcons: true,
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
      console.log('CameraScreen-didUpdate-remountCamera');
      setTimeout(() => {
        this.setState({remountCamera: false});
        SplashScreen.hide();
      }, 10);
    }
    if (this.state.showLoadingScreen) {
      console.log('CameraScreen-didUpdate-showLoadingScreen');
      setTimeout(() => {
        console.log('timer running');
        this.setState({showLoadingScreen: false});
      }, 50);
    }
    if (this.state.showBlurScreen) {
      console.log('CameraScreen-didUpdate-showBlurScreen');
      setTimeout(() => {
        this.setState({showBlurScreen: false});
      }, 600);
    }
  }
  async componentDidMount() {
    // hideNavigationBar();
    console.log('CameraScreen componentDidMount');
    try {
      const response = await changeNavigationBarColor(TAB_BAR_COLOR);
      console.log(response); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }

    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   {
    //     title: 'AndoridPermissionExample App Camera Permission',
    //     message: 'AndoridPermissionExample App needs access to your camera ',
    //   },
    // );

    this.camera.refreshAuthorizationStatus();
    if (this.props.cameraAspectRatio.length <= 1) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      this.props.setCameraAspectRatio(ratios);
      console.log('this.props.aspectRatio', this.props.cameraAspectRatio);
    }

    this.setState({
      volume: await VolumeControl.getVolume(),
    });

    this.volEvent = VolumeControlEvents.addListener(
      'VolumeChanged',
      this.volumeEvent,
    );

    SplashScreen.hide();
    this.setState({showLoadingScreen: false, showBlurScreen: false});
  }
  volumeEvent = event => {
    if (this.state.volume >= event.volume) this.takePicture();

    this.setState({volume: event.volume});
  };

  componenDidUnmount() {
    console.log('CameraScreen componenDidUnmount');

    // remove event listener
    this.volEvent.remove();
  }
  onPressGallery = () => {
    this.props.navigation.navigate('GalleryTab');
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
    const data = await this.camera.takePictureAsync(options);

    if (this.props.textMode)
      this.props.navigation.navigate('PreviewScreen', {photo: data});
    else {
      let newPhoto = {};
      const temp = data.uri.split('/');
      const d = new Date();
      const newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;
      let nameToChange = temp[temp.length - 1];
      let renamedURI = data.uri.replace(nameToChange, newName);
      RNFS.copyFile(data.uri, renamedURI).then(() => {
        CameraRoll.save(renamedURI, {
          type: 'photo',
          album: 'Cykee',
        }).then(uri => {
          newPhoto.height = data.height;
          newPhoto.width = data.width;
          let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
          newPhoto.fileName = newName;
          newPhoto.caption = '';
          newPhoto.captionStyle = {captionSize: 0, captionFont: 0};
          newPhoto.uri = galleryUri + newPhoto.fileName;
          newPhoto.creationDate = d;
          // newPhoto.uri = uri;
          console.log('Photo saved in gallery from CameraScreen:', newPhoto);
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
    console.log('CameraScreen render');
    if (this.state.showLoadingScreen) return <PendingView />;

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
        onSwipeRight={() => this.props.navigation.navigate('GalleryTab')}
        onSwipeDown={() => BackHandler.exitApp()}
        onSwipeUp={() => this.onPressGalleryIcon()}
        config={config}
        style={StyleSheet.absoluteFill}>
        <View style={styles.container}>
          {/* <StatusBar hidden={true} barStyle="light-content" /> */}
          {/* <StatusBar translucent /> */}
          <StatusBar backgroundColor={'transparent'} translucent />
          <RNCamera
            ref={ref => (this.camera = ref)}
            style={{
              height: this.props.aspectRatio ? '75%' : '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type={this.props.cameraType ? 0 : 1} //back:0 , front:1
            flashMode={this.props.flashMode}
            onCameraReady={this.getCameraRatio}
            ratio={
              this.props.aspectRatio
                ? '4:3'
                : this.props.cameraAspectRatio[
                    this.props.cameraAspectRatio.length - 1
                  ]
            }
            autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
            defaultOnFocusComponent={true}
            autoFocus={true}
            // onPictureTaken={() => console.log('onPictureTaken')}
          >
            {({camera, status, recordAudioPermissionStatus}) => {
              if (status !== 'READY') {
                console.log('NOT READY');
                return <BlurLoadingView />;
              }
              return (
                <View style={StyleSheet.absoluteFill}>
                  <View
                    style={[
                      styles.autoFocusBox,
                      drawFocusRingPosition,
                      {
                        borderColor: this.state.focus ? 'white' : '#0000',
                      },
                    ]}
                  />
                  <TouchableWithoutFeedback
                    onPress={event => this.touchToFocus(event)}>
                    <View style={{flex: 1}} />
                  </TouchableWithoutFeedback>

                  <View style={styles.CameraIconContainer}>
                    <MoreIcon
                      onPressMore={() =>
                        this.setState({
                          showIcons: !this.state.showIcons,
                        })
                      }
                    />
                    {this.state.showIcons && (
                      <View>
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
                          onPressAspectRatio={() => {
                            this.setState({
                              showLoadingScreen: true,
                            });
                            this.props.changeAspectRatio(
                              !this.props.aspectRatio,
                            );
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
          </RNCamera>
          <View style={styles.bottomContainer}>
            <GalleryButton
              photo_uri1={
                this.props.photoArray[0] ? this.props.photoArray[0].uri : ''
              }
              photo_uri2={
                this.props.photoArray[1] ? this.props.photoArray[1].uri : ''
              }
              photo_uri3={
                this.props.photoArray[2] ? this.props.photoArray[2].uri : ''
              }
              onPressGalleryIcon={() => this.onPressGallery()}
            />
            <TakePicture
              onTakePicture={() => this.takePicture()}
              onTakeVideo={() => this.takeVideo()}
            />
            <CameraType
              onPressCameraType={() => {
                this.setState({showBlurScreen: true});
                this.props.changeCameraType(!this.props.cameraType);
              }}
            />
          </View>
        </View>
        {this.state.showBlurScreen && <BlurLoadingView />}
      </GestureRecognizer>
    );
  }
}

export default CameraScreen;
