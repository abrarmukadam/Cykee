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
} from '../../SubComponents/Buttons/index';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    text: '',
    captionSize: 0,
    captionFont: 0,
    saveInProgress: false,
    showIcons: true,
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
              resizeMode={
                ImageRatio >= 2
                  ? FastImage.resizeMode.stretch
                  : FastImage.resizeMode.contain
              }
              style={StyleSheet.absoluteFill}
              // style={styles.image}
            />
          </TouchableWithoutFeedback>

          <View style={styles.bottomContainer}>
            <View style={{flexDirection: 'row'}}>
              {!this.state.showFontIcons && (
                <FontButton
                  iconType="material-community"
                  buttonName={'format-size'}
                  handleOnPress={this.captionSizePressed}
                />
              )}
              {!this.state.showFontIcons && (
                <FontButton
                  iconType="material-community"
                  buttonName={'format-font'}
                  handleOnPress={this.captionFontPressed}
                />
              )}
              <Icon
                type={'entypo'}
                name={
                  this.state.showFontIcons
                    ? 'chevron-small-right'
                    : 'chevron-small-left'
                }
                size={GlobalIconSize - 10}
                color={this.state.showFontIcons ? FONT_ICON_COLOR : '#0000'}
                reverseColor={CykeeColor}
                reverse
                containerStyle={{
                  opacity: FONT_ICON_OPACITY,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: this.state.showFontIcons ? 0 : -10,
                }}
                onPress={() =>
                  this.setState({
                    showFontIcons: !this.state.showFontIcons,
                  })
                }
              />
            </View>
            <View style={styles.textBoxContainer}>
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
                onChangeText={text => this.setState({text})}
                autoCapitalize="none"
                padding={10}
              />
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
