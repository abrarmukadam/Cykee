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
  ToastAndroid,
  DeviceEventEmitter,
  Text,
} from 'react-native';
import styles from './styles';
import {RNCamera, FaceDetector} from 'react-native-camera';
import GalleryButton from './../../SubComponents/GalleryButton/GalleryButton';
import CameraRoll from '@react-native-community/cameraroll';
// import VolumeControl, {VolumeControlEvents} from 'react-native-volume-control';
var RNFS = require('react-native-fs');
import SplashScreen from 'react-native-splash-screen';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {UIActivityIndicator} from 'react-native-indicators';
import {BlurView} from '@react-native-community/blur';

// import {AppTour, AppTourSequence, AppTourView} from 'react-native-app-tour';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

import {
  TakePicture,
  TakeVideoButton,
  CameraType,
  GalleryIcon,
  CykeeColor,
  TAB_BAR_COLOR,
  BACKGROUND_COLOR,
  CameraSettingComponent,
  ZoomViewComponent,
  saveFileFunction,
} from './../../SubComponents/Buttons/index';
import GestureRecognizer from 'react-native-swipe-gestures';
const ZOOM_F = 0.08;

const PendingView = () => (
  <View
    style={{
      flex: 1,
      // backgroundColor: {BACKGROUND_COLOR},
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <StatusBar backgroundColor={'transparent'} translucent />

    {/* <UIActivityIndicator color={'#0000'} /> */}
    <UIActivityIndicator color={'#0000'} />
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
    this.appTourTargets = [];
  }
  state = {
    remountCamera: false,
    firstLaunch: true,
    options: {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      fixOrientation: true,
      volume: 0,
    },
    focus: false,
    zoom: 0.0,
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    canDetectFaces: this.props.faceDetectionMode,
    faces: [],
    isRecording: false,
  };
  facesDetected = ({faces}) => this.setState({faces});
  renderFace = ({bounds, faceID, rollAngle, yawAngle}) => (
    <View
      key={faceID}
      transform={[
        {perspective: 600},
        // {rotateZ: `${rollAngle.toFixed(0)}deg`},
        // {rotateY: `${yawAngle.toFixed(0)}deg`},
        {rotateZ: 0},
        {rotateY: 0},
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    />
  );

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  componentDidUpdate() {
    if (this.state.hideFlashScreen)
      setTimeout(() => {
        console.log('Timer:this.state.hideFlashScreen');
        this.setState({hideFlashScreen: false});
        SplashScreen.hide();
      }, 20);

    if (this.state.remountCamera) {
      console.log('CameraScreen-didUpdate-remountCamera');
      setTimeout(() => {
        ToastAndroid.show('Initializing Settings !', ToastAndroid.SHORT);
        console.log('Timer:this.state.remountCamera');

        this.setState({remountCamera: false});
        // this.forceUpdate();
        // SplashScreen.hide();
      }, 100);
    }
    if (this.state.showLoadingScreen) {
      console.log('CameraScreen-didUpdate-showLoadingScreen');
      setTimeout(() => {
        console.log('Timer:this.state.showLoadingScreen');
        this.setState({showLoadingScreen: false});
      }, 50);
    }
    if (this.state.showBlurScreen) {
      console.log('CameraScreen-didUpdate-showBlurScreen');
      setTimeout(() => {
        console.log('Timer:this.state.showBlurScreen');
        this.setState({showBlurScreen: false});
      }, 600);
    }
  }

  registerSequenceStepEvent = () => {
    if (this.sequenceStepListener) {
      this.sequenceStepListener.remove();
    }
    this.sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };

  registerFinishSequenceEvent = () => {
    if (this.finishSequenceListener) {
      this.finishSequenceListener.remove();
    }
    this.finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };
  async componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    console.log('CameraScreen componentDidMount');
    try {
      const response = await changeNavigationBarColor('transparent');
      // const response = await changeNavigationBarColor('#0000');
      console.log(response); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }
    // setTimeout(() => {
    //   let appTourSequence = new AppTourSequence();
    //   this.appTourTargets.forEach(appTourTarget => {
    //     appTourSequence.add(appTourTarget);
    //   });

    //   AppTour.ShowSequence(appTourSequence);
    // }, 1000);
    // this.camera.refreshAuthorizationStatus();
    // if (this.props.cameraAspectRatio.length <= 1) {
    //   const ratios = await this.camera.getSupportedRatiosAsync();
    //   this.props.setCameraAspectRatio(ratios);
    //   console.log('this.props.aspectRatio', this.props.cameraAspectRatio);
    //   console.log('remountCamerae', this.state.remountCamera);
    // }

    // this.setState({
    //   volume: await VolumeControl.getVolume(),
    // });

    // this.volEvent = VolumeControlEvents.addListener(
    //   'VolumeChanged',
    //   this.volumeEvent,
    // );

    SplashScreen.hide();
    this.setState({showLoadingScreen: false, showBlurScreen: false});
  }
  volumeEvent = event => {
    if (this.state.volume >= event.volume) this.takePicture();

    this.setState({volume: event.volume});
  };

  componenDidUnmount() {
    console.log('CameraScreen componenDidUnmount');
    this.registerSequenceStepEvent();
    this.registerFinishSequenceEvent();
    // remove event listener
    // this.volEvent.remove();
  }
  onPressGallery = () => {
    if (this.state.isRecording != true) {
      this.props.navigation.navigate('GalleryTab');
      changeNavigationBarColor(TAB_BAR_COLOR);
      // this.props.navigation.navigate('GridViewScreen');
    }
  };

  stopVideo = async () => {
    await this.camera.stopRecording();
    this.setState({isRecording: false});
  };

  takeVideo = async () => {
    const recordOptions = {
      mute: false,
      maxDuration: 300,
      // mirrorVideo: this.props.cameraType ? true : false, //0 = back , 1 = front
      mirrorVideo: true,
      orientation: 'portrait',
      playSoundOnCapture: true,
      quality: '1080p',
      // quality: RNCamera.Constants.VideoQuality['720p'],
      // quality: RNCamera.Constants.VideoQuality['1080p'],
      // fps: 30,
    };
    const {isRecording} = this.state;
    console.log('take video');
    if (this.camera && !isRecording) {
      try {
        const promise = this.camera.recordAsync(recordOptions);

        if (promise) {
          this.setState({isRecording: true});
          const data = await promise;
          console.warn('takeVideo', data);
          data.width = 1080;
          data.height = 1920;
          if (this.props.textMode) {
            console.log('going to preview screen');
            this.props.navigation.navigate('PreviewScreen', {
              photo: data,
              type: 'video',
            });
          } else {
            let newPhoto = {};
            console.log('saving without preview screen');
            saveFileFunction({
              data: data,
              fileType: 'video',
              caption: '',
              captionStyle: {
                captionSize: 0,
                captionFont: 0,
              },
              fav_status: false,
              tagsArray: this.props.autoTagEnabled
                ? this.props.autoTagValue.length
                  ? [this.props.autoTagValue]
                  : []
                : [],
              saveType: 'add',
              callingScreen: 'CameraScreen',
              addNewPhoto: newPhoto => this.props.addNewPhoto(newPhoto),
            });

            this.camera.resumePreview();
            this.setState({focus: false});
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }
  takePicture = async () => {
    // newPhoto: {
    //   height: Number;
    //   width: Number;
    //   uri: String;
    //   fileName: String;
    //   caption: String;
    //   captionStyle:{captionSize: Number , captionFont: Number}
    //   tagsArray: Array;
    //   creationDate: [date, time];
    //   type:'photo','video','gif'
    //   duration: Number
    // }
    const options = {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      fixOrientation: true,
      volume: 0,
      pauseAfterCapture: true,
      mirrorImage: this.props.cameraType ? false : true, //0 = back , 1 = front
      playSoundOnCapture: true,
    };
    console.log('CLICK CLICK');
    const data = await this.camera.takePictureAsync(options);

    if (this.props.textMode) {
      console.log('going to preview screen');
      this.props.navigation.navigate('PreviewScreen', {
        photo: data,
        type: 'photo',
      });
    } else {
      let newPhoto = {};
      console.log('saving without preview screen');
      saveFileFunction({
        data: data,
        fileType: 'photo',
        caption: '',
        captionStyle: {
          captionSize: 0,
          captionFont: 0,
        },
        fav_status: false,
        tagsArray: this.props.autoTagEnabled
          ? this.props.autoTagValue.length
            ? [this.props.autoTagValue]
            : []
          : [],
        saveType: 'add',
        callingScreen: 'CameraScreen',
        addNewPhoto: newPhoto => this.props.addNewPhoto(newPhoto),
      });
    }
    this.camera.resumePreview();
    this.setState({focus: false});
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
    this.props.hideCameraSettings(false);
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
    if (
      this.props.cameraAspectRatio.length <= 1 &&
      this.state.remountCamera == false
    ) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      this.props.setCameraAspectRatio(ratios);
      this.setState({remountCamera: true, hideFlashScreen: true});
      console.log('getCameraRatio');
    }
    console.log('CAMERA READY');
    this.setState({sample: true});

    // if (!this.state.asp && this.camera) {
    //   const ratios = await this.camera.getSupportedRatiosAsync();
    //   console.log('getCameraRatio');
    //   this.setState({
    //     asp: ratios[ratios.length - 1],
    //     remountCamera: true,
    //   });
    // }
  };

  _onPinchStart = () => {
    this._prevPinch = 1;
  };

  _onPinchEnd = () => {
    this._prevPinch = 1;
  };

  _onPinchProgress = p => {
    let p2 = p - this._prevPinch;
    if (p2 > 0 && p2 > ZOOM_F) {
      this._prevPinch = p;
      this.setState({zoom: Math.min(this.state.zoom + ZOOM_F, 1)}, () => {});
    } else if (p2 < 0 && p2 < -ZOOM_F) {
      this._prevPinch = p;
      this.setState({zoom: Math.max(this.state.zoom - ZOOM_F, 0)}, () => {});
    }
  };

  render() {
    const {canDetectFaces} = this.state;
    console.log('this.state.firstLaunch', this.state.firstLaunch);
    console.log('render');
    // hideNavigationBar();
    if (Platform.OS != 'android') return <PendingView />;
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
          {!this.state.remountCamera && (
            <RNCamera
              ref={ref => (this.camera = ref)}
              style={{
                height: this.props.aspectRatio ? '75%' : '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // androidCameraPermissionOptions={{
              //   title: 'Permission to use camera',
              //   message: 'We need your permission to use your camera',
              //   buttonPositive: 'Ok',
              //   buttonNegative: 'Cancel',
              // }}
              type={this.props.cameraType ? 0 : 1} //back:0 , front:1
              flashMode={this.props.flashMode}
              onCameraReady={this.getCameraRatio}
              // onCameraReady={() => this.setState({hideFlashScreen: true})}
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
              zoom={this.state.zoom}
              onPictureTaken={() => {
                if (Platform.OS == 'android')
                  PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  );
              }}
              // faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
              // onFacesDetected={
              //   this.props.faceDetectionMode ? this.facesDetected : null
              // }
            >
              {({camera, status, recordAudioPermissionStatus}) => {
                if (status !== 'READY') {
                  console.log('NOT READY');

                  return <BlurLoadingView />;
                }
                return (
                  <View style={StyleSheet.absoluteFill}>
                    <ZoomViewComponent
                      onPinchEnd={this._onPinchEnd}
                      onPinchStart={this._onPinchStart}
                      onPinchProgress={this._onPinchProgress}>
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
                    </ZoomViewComponent>
                  </View>
                );
              }}
              {/* {!!canDetectFaces && this.renderFaces()} */}
              {/* {!!canDetectFaces && this.renderLandmarks()} */}
            </RNCamera>
          )}
          {/* {this.props.hideCameraSettingsIcons && ( */}
          {/* <View style={{borderColor: 'yellow', borderWidth: 1, flex: 1}}> */}
          <CameraSettingComponent
            addAppTourTarget={appTourTarget => {
              this.appTourTargets.push(appTourTarget);
            }}
            // firstLaunch={false}
            firstLaunch={
              // false
              this.props.cameraAspectRatio.length > 0 ? true : false
            }
            // firstLaunch={this.props.photoArray[0] ? true : false}
            onPressAspectRatio={() =>
              this.setState({
                showLoadingScreen: true,
              })
            }
            onPressBlankCaption={() =>
              this.props.navigation.navigate('BlankCaptionScreen')
            }
          />
          {/* </View> */}
          {/* )} */}

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
              photo1={this.props.photoArray[0]}
              photo2={this.props.photoArray[1]}
              photo3={this.props.photoArray[2]}
              onPressGalleryIcon={() => this.onPressGallery()}
            />
            <TakePicture
              onTakePicture={() => this.takePicture()}
              onTakeVideo={() => this.takeVideo()}
              onRecordingStopped={() => this.stopVideo()}
              addAppTourTarget={appTourTarget => {
                this.appTourTargets.push(appTourTarget);
              }}
              firstLaunch={
                // false
                this.props.cameraAspectRatio.length > 0 ? true : false
              }
            />
            {/* <TakeVideoButton /> */}
            <CameraType
              onPressCameraType={() => {
                this.setState({showBlurScreen: true});
                this.props.changeCameraType(!this.props.cameraType);
              }}
              isRecording={this.state.isRecording}
            />
          </View>
        </View>
        {this.state.showBlurScreen && <BlurLoadingView />}
      </GestureRecognizer>
    );
  }
}

export default CameraScreen;
