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
} from '../../SubComponents/Buttons/index';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {set} from 'react-native-reanimated';

class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
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
    tagText: '',
    tagsArray: [],
  };

  componentDidMount() {
    changeNavigationBarColor('black');

    this.props.navigation.setOptions({
      headerLeft: () => this.leftHeaderButton,
    });
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
  leftHeaderButton = (
    <TouchableOpacity
      onPress={() => this.props.navigation.goBack()}
      style={{paddingLeft: 20}}
      // style={[styles.IconContainer, {flex: 0}]}
    >
      <Icon
        type="ionicon"
        name="md-close"
        size={GlobalIconSize}
        color={'white'}
      />
    </TouchableOpacity>
  );

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

  savePhoto = data => {
    this.setState({saveInProgress: true});
    let newPhoto = {};

    const d = new Date();
    const newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;
    newPhoto.creationDate = [
      moment().format('MMM DD, YYYY'),
      moment().format('hh:mm:ss a'),
    ];

    const temp = data.uri.split('/');
    let nameToChange = temp[temp.length - 1];
    let currentAlbumName = temp[temp.length - 2];
    let renamedURI = data.uri.replace(nameToChange, newName);
    let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
    let tempGalleryUri = 'file:///storage/emulated/0/Pictures/' + newName;
    let destinationUri = '';
    newPhoto.height = data.height;
    newPhoto.width = data.width;
    newPhoto.fileName = newName;
    newPhoto.caption = this.state.text;
    newPhoto.tagsArray = this.state.tagsArray;
    newPhoto.captionStyle = {
      captionSize: this.state.captionSize,
      captionFont: this.state.captionFont,
    };
    newPhoto.uri = galleryUri + newPhoto.fileName;

    if (currentAlbumName == 'Cykee') {
      console.log('Photo already in Cykee Gallery');
      destinationUri = tempGalleryUri;
    } else {
      console.log('Photo in other gallery');
      destinationUri = renamedURI;
    }
    RNFS.copyFile(data.uri, destinationUri).then(() => {
      CameraRoll.save(destinationUri, {
        type: 'photo',
        album: 'Cykee',
      }).then(uri => {
        this.props.addNewPhoto(newPhoto);
        if (currentAlbumName == 'Cykee') RNFS.unlink(tempGalleryUri);
        this.props.navigation.goBack();
      });
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
          {this.state.showIcons && (
            <TouchableOpacity
              onPress={() => this.setState({tagPressed: true})}
              style={{
                position: 'absolute',
                top: 80,
                left: 20,
                // flexWrap: 'wrap',
              }}>
              <TagDisplayComponent tagsArray={this.state.tagsArray} />
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
            />
          )}
          <View style={styles.bottomContainer}>
            {this.state.showIcons && (
              <FontIconsComponent
                showFontIcons={this.props.showFontIcons}
                captionFontPressed={this.captionFontPressed}
                captionSizePressed={this.captionSizePressed}
                tagPressed={this.tagPressed}
                enterTag={this.state.tagPressed}
              />
            )}

            <View style={styles.textBoxContainer}>
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
