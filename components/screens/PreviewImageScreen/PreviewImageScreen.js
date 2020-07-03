import React, {Component} from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import ImageRotate from 'react-native-image-rotate';

import FastImage from 'react-native-fast-image';
import GestureRecognizer from 'react-native-swipe-gestures';
var RNFS = require('react-native-fs');
import moment from 'moment';
import {
  GlobalIconColor,
  GlobalIconSize,
  CheckCircle,
  CykeeColor,
  CAPTION_FONT,
  CAPTION_SIZE,
  FontButton,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
  GalleryIconColor,
  TAB_BAR_COLOR,
  EditIconsComponent,
  FontIconsComponent,
  TagComponent,
  TagDisplayComponent,
  PlayOverlay,
  saveFileFunction,
  PlayVideoComponent,
} from '../../SubComponents/Buttons/index';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppTour, AppTourSequence, AppTourView} from 'react-native-app-tour';

// import {leftHeaderButton} from
class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
    this.appTourTargets = [];
  }

  state = {
    photo: this.props.route.params.photo,
    tempPhoto: this.props.route.params.photo,
    text: '',
    captionSize: 0,
    captionFont: 0,
    saveInProgress: false,
    showIcons: true,
    showEditOptions: true,
    prevPhoto: {},
    nextPhoto: {},
    tagPressed: false,
    tagText: '',
    tagsArray: this.props.autoTagEnabled
      ? this.props.autoTagValue.length
        ? [this.props.autoTagValue]
        : []
      : [],
  };

  componentDidMount() {
    changeNavigationBarColor('black');

    this.props.navigation.setOptions({
      headerLeft: () => this.leftHeaderButton,
    });
    // if (!this.props.photoArray[0])
    setTimeout(() => {
      let appTourSequence = new AppTourSequence();
      this.appTourTargets.forEach(appTourTarget => {
        appTourSequence.add(appTourTarget);
      });

      AppTour.ShowSequence(appTourSequence);
    }, 1000);
  }
  componentWillUnmount() {
    if (this.props.route.params.navigatingFrom != 'CameraRoll')
      changeNavigationBarColor('transparent');
    else changeNavigationBarColor(TAB_BAR_COLOR);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tempPhoto.uri != this.state.tempPhoto.uri) {
      this.setState({
        photo: this.state.tempPhoto,
        prevPhoto: prevState.photo,
        nextPhoto: {},
      });
      console.log('photo changed');
    }
  }

  captionSizePressed = () => {
    if (this.state.captionSize >= 2) this.setState({captionSize: 0});
    else this.setState({captionSize: this.state.captionSize + 1});
    console.log('captionSize Pressed');
  };
  captionFontPressed = () => {
    if (this.state.captionFont >= 3) this.setState({captionFont: 0});
    else
      this.setState({
        captionFont: this.state.captionFont + 1,
      });

    console.log('captionFont Pressed');
  };
  leftHeaderButton = (
    <TouchableOpacity
      onPress={() => this.props.navigation.goBack()}
      // style={{paddingLeft: 20}}
      style={{
        // paddingLeft: 20,
        marginLeft: 20,
      }}
      // style={[styles.IconContainer, {flex: 0}]}
    >
      <View
        style={{
          backgroundColor: 'grey',
          paddingHorizontal: 7,
          borderRadius: 20,
          opacity: 0.2,
        }}>
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 7,
          borderRadius: 20,
          position: 'absolute',
        }}>
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
        />
      </View>
    </TouchableOpacity>
  );

  savePhoto = data => {
    this.setState({saveInProgress: true});
    saveFileFunction({
      data: data,
      fileType: this.props.route.params.type,
      caption: this.state.text,
      captionStyle: {
        captionSize: this.state.captionSize,
        captionFont: this.state.captionFont,
      },
      fav_status: false,
      tagsArray: this.state.tagsArray,
      saveType: 'add',
      callingScreen: 'PreviewScreen',
      addNewPhoto: newPhoto => this.props.addNewPhoto(newPhoto),
      afterSaveFunction: () => this.props.navigation.goBack(),
    });
  };

  onSwipeDown = () => {
    console.log('DOWN SWIPE');
    this.savePhoto(this.state.photo);
  };
  undoPressed = () => {
    this.setState({
      nextPhoto: this.state.tempPhoto,
      photo: this.state.prevPhoto,
      prevPhoto: {},
    });
  };
  redoPressed = () => {
    this.setState({
      prevPhoto: this.state.photo,
      photo: this.state.nextPhoto,
      nextPhoto: {},
    });
  };
  rotatePressed = () => {
    let DisplayedPhoto = {};
    console.log(this.state.photo.uri);
    ImageRotate.rotateImage(
      this.state.photo.uri,
      90,
      uri => {
        DisplayedPhoto.source = {uri: uri};
        DisplayedPhoto.uri = uri;
        DisplayedPhoto.height = this.state.photo.width;
        DisplayedPhoto.width = this.state.photo.heightl;
        this.setState({tempPhoto: DisplayedPhoto});
      },
      error => {
        console.error(error);
      },
    );
  };
  cropPressed = () => {
    ImagePicker.openCropper({
      freeStyleCropEnabled: true,
      path: this.state.photo.uri,
    }).then(image => {
      image.uri = image.path;
      image.source = {uri: image.path};
      this.setState({tempPhoto: image});
    });
  };
  tagPressed = () => {
    this.setState({tagPressed: !this.state.tagPressed});
  };
  tagsArrayChanged = tagsArray => {
    this.setState({tagsArray});
    this.props.autoTagSetting(tagsArray[0]);
    // console.log(tagsArray);
  };
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    let ImageRatio = 1;
    if (this.state.photo.height) {
      ImageRatio = this.state.photo.height / this.state.photo.width;
    } else ImageRatio = 1;

    return (
      <GestureRecognizer
        onSwipeDown={() => this.onSwipeDown()}
        config={config}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <StatusBar hidden={false} />
        <KeyboardAvoidingView style={styles.container}>
          {this.props.route.params.type != 'video' &&
            this.props.route.params.type != 'blankCaption' && (
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                onPressIn={() => {
                  //   Keyboard.dismiss;
                  this.props.navigation.setOptions({
                    headerShown: !this.state.showIcons,
                  });

                  this.setState({
                    showIcons: !this.state.showIcons,
                  });
                }}>
                <FastImage
                  source={{
                    uri: this.state.photo.uri,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={StyleSheet.absoluteFill}
                  // style={styles.image}
                />
              </TouchableWithoutFeedback>
            )}
          {this.props.route.params.type == 'video' && (
            <View style={StyleSheet.absoluteFill}>
              <PlayVideoComponent />
              <PlayOverlay
                onPressPlay={() => {
                  console.log('Play video Pressed');
                }}
              />
            </View>
          )}
          {this.state.showIcons && (
            <TouchableOpacity
              onPress={() => this.setState({tagPressed: true})}
              style={{
                position: 'absolute',
                top: 80,
                left: 20,
                // flexWrap: 'wrap',
              }}>
              <TagDisplayComponent
                tagsArray={this.state.tagsArray}
                autoTagActive={
                  this.props.autoTagEnabled ? this.props.autoTagValue : ''
                }
              />
            </TouchableOpacity>
          )}
          {this.state.showIcons && (
            <EditIconsComponent
              showEditOptions={this.state.showEditOptions}
              cropPressed={this.cropPressed}
              rotatePressed={this.rotatePressed}
              undoPressed={this.undoPressed}
              redoPressed={this.redoPressed}
              prevPhoto={this.state.prevPhoto}
              nextPhoto={this.state.nextPhoto}
              showIconName={this.props.photoArray.length < 5 ? true : false}
            />
          )}
          <View style={styles.bottomContainer}>
            {this.state.showIcons && (
              <FontIconsComponent
                type={this.props.route.params.type}
                showFontIcons={this.props.showFontIcons}
                captionFontPressed={this.captionFontPressed}
                captionSizePressed={this.captionSizePressed}
                tagPressed={this.tagPressed}
                enterTag={this.state.tagPressed}
                tagsArray={this.props.autoTagEnabled}
                addAppTourTarget={appTourTarget => {
                  this.appTourTargets.push(appTourTarget);
                }}
                showIconName={this.props.photoArray.length < 5 ? true : false}
                // firstLaunch={true}
                firstLaunch={this.props.photoArray[0] ? true : false}
              />
            )}

            <View style={styles.textBoxContainer}>
              {this.state.tagPressed && (
                <ToggleSwitch
                  isOn={this.props.autoTagEnabled}
                  onColor={CykeeColor}
                  offColor="grey"
                  label={`Enable auto-Tag ${
                    this.state.tagsArray[0] && this.props.autoTagEnabled
                      ? `'${this.state.tagsArray[0]}'`
                      : ''
                  }`}
                  labelStyle={{color: 'white', fontWeight: '900'}}
                  size="small"
                  onToggle={() =>
                    this.props.setAutoTagEnabled(!this.props.autoTagEnabled)
                  }
                />
              )}
              {!this.state.tagPressed && (
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {
                      fontSize: CAPTION_SIZE[this.state.captionSize],
                      fontFamily: CAPTION_FONT[this.state.captionFont],
                    },
                  ]}
                  placeholder={'Add a caption...'}
                  placeholderTextColor="grey"
                  value={this.state.text}
                  multiline
                  // autoFocus
                  onChangeText={text => {
                    this.setState({text});
                  }}
                  autoCapitalize="none"
                  padding={10}
                  onBlur={() => this.setState({showIcons: true})}
                />
              )}
              {this.state.tagPressed && (
                <TagComponent
                  tagsArrayChanged={this.tagsArrayChanged}
                  tagsArray={this.state.tagsArray}
                />
              )}
            </View>
          </View>
          <View style={styles.saveButtonStyle}>
            <TouchableOpacity
              onPress={() => this.savePhoto(this.state.photo)}
              disabled={this.state.saveInProgress}>
              <CheckCircle iconSize={70} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </GestureRecognizer>
    );
  }
}

export default PreviewImageScreen;
