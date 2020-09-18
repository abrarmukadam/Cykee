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
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

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
  PreviewVideoComponent,
} from '../../SubComponents/Buttons/index';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppTour, AppTourSequence, AppTourView} from 'react-native-app-tour';

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
    //   if (!this.props.photoArray[0])
    //     setTimeout(() => {
    //       let appTourSequence = new AppTourSequence();
    //       this.appTourTargets.forEach(appTourTarget => {
    //         appTourSequence.add(appTourTarget);
    //       });

    //       AppTour.ShowSequence(appTourSequence);
    //     }, 1000);
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
    console.log(CAPTION_FONT[this.state.captionFont]);
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
          paddingHorizontal: 2,
          borderRadius: 20,
          opacity: 0.3,
        }}>
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
          underlayColor={'#0000'}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 2,
          borderRadius: 20,
          position: 'absolute',
        }}>
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
          underlayColor={'#0000'}
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

    ImageResizer.createResizedImage(
      this.state.photo.uri,
      this.state.photo.height,
      this.state.photo.width,
      'JPEG',
      100,
      90,
      null,
    )
      .then(response => {
        console.log('rotate uri:', response.uri);
        DisplayedPhoto.source = {uri: response.uri};
        DisplayedPhoto.uri = response.uri;
        DisplayedPhoto.height = this.state.photo.width;
        DisplayedPhoto.width = this.state.photo.height;
        this.setState({tempPhoto: DisplayedPhoto, photo: DisplayedPhoto});
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
      })
      .catch(err => {
        console.log('fail:', err);

        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
  };
  cropPressed = () => {
    ImagePicker.openCropper({
      freeStyleCropEnabled: true,
      path: this.state.photo.uri,
    }).then(image => {
      console.log('crop uri:', image.path);
      image.uri = image.path;
      image.source = {uri: image.path};
      this.setState({tempPhoto: image});
    });
  };
  tagPressed = () => {
    this.setState({tagPressed: !this.state.tagPressed});
    console.log('tagssPressed');
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
      // <KeyboardAvoidingView
      //   style={styles.container}
      //   behavior="height"
      //   //
      // >
      <GestureRecognizer
        onSwipeDown={() => this.onSwipeDown()}
        config={config}
        style={styles.container}>
        <StatusBar hidden={false} />
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
                // style={styles.container}
              />
            </TouchableWithoutFeedback>
          )}
        {this.props.route.params.type == 'video' && (
          <View style={StyleSheet.absoluteFill}>
            <PreviewVideoComponent
              video={this.state.photo}
              onPlayPressed={pauseStatus => {
                console.log('play pressed in preview');
                this.setState({showIcons: pauseStatus});
              }}
              pauseStatus={true}
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
              // backgroundColor: 'red',
            }}>
            <TagDisplayComponent
              tagsArray={this.state.tagsArray}
              autoTagActive={
                this.props.autoTagEnabled ? this.props.autoTagValue : ''
              }
            />
          </TouchableOpacity>
        )}

        <View style={styles.bottomContainer}>
          {this.state.showIcons && this.props.route.params.type != 'video' && (
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
            {!this.state.tagPressed && this.state.showIcons && (
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
            {this.state.tagPressed && this.state.showIcons && (
              <TagComponent
                tagsArrayChanged={this.tagsArrayChanged}
                tagsArray={this.state.tagsArray}
              />
            )}
          </View>
        </View>
        <View style={styles.saveButtonStyle}>
          {this.state.showIcons && (
            <TouchableOpacity
              onPress={() => this.savePhoto(this.state.photo)}
              disabled={this.state.saveInProgress}>
              <CheckCircle iconSize={70} />
            </TouchableOpacity>
          )}
        </View>
      </GestureRecognizer>
      // {/* </KeyboardAvoidingView> */}
    );
  }
}

export default PreviewImageScreen;
