import React, {Component} from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import FastImage from 'react-native-fast-image';
import GestureRecognizer from 'react-native-swipe-gestures';
var RNFS = require('react-native-fs');
import {Input} from 'react-native-elements';

import {
  GlobalIconColor,
  GlobalIconSize,
  CheckCircle,
  CykeeColor,
  CAPTION_FONT,
  CAPTION_SIZE,
} from '../../SubComponents/Buttons/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
const FONT_ICON_COLOR = 'silver';
const ICON_OPACITY = 0.7;

class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    text: '',
    captionSize: 0,
    captionFont: 0,
  };
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
    let newPhoto = {};
    const temp = data.uri.split('/');
    console.log('Photo saved in gallery');

    const d = new Date();
    const newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;
    let nameToChange = temp[temp.length - 1];
    let renamedURI = data.uri.replace(nameToChange, newName);
    RNFS.copyFile(data.uri, renamedURI).then(() => {
      CameraRoll.save(renamedURI, {
        // CameraRoll.save(this.state.photo.uri, {
        type: 'photo',
        album: 'Cykee',
      }).then(uri => {
        console.log('uri:', uri);
        let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';

        newPhoto.height = data.height;
        newPhoto.width = data.width;
        newPhoto.fileName = newName;
        newPhoto.caption = this.state.text;
        newPhoto.captionStyle = {
          captionSize: this.state.captionSize,
          captionFont: this.state.captionFont,
        };

        newPhoto.uri = galleryUri + newPhoto.fileName;
        // newPhoto.uri = uri;
        console.log('Photo saved in gallery:', newPhoto);
        this.props.addNewPhoto(newPhoto);
        // this.props.navigation.navigate('Home');
        this.props.navigation.goBack();
        console.log('height', newPhoto.height);
        console.log('width', newPhoto.width);
        console.log(newPhoto.height / newPhoto.width);
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
      // <SafeAreaView style={StyleSheet.absoluteFill}>
      <GestureRecognizer
        // onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeDown={() => this.onSwipeDown()}
        config={config}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <StatusBar hidden={false} />
        <KeyboardAvoidingView style={styles.container}>
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
          {/* <Image source={{uri: abx}} style={styles.image} /> */}
          {/* <Icon
          name="ios-close"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.crossButtonStyle}
          onPress={() => this.props.navigation.navigate('Home')}
        /> */}

          <View style={styles.bottomContainer}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                type="material-community"
                name="format-size"
                size={GlobalIconSize - 10}
                color={FONT_ICON_COLOR}
                underlayColor={'black'}
                reverse={true}
                raised
                reverseColor={CykeeColor}
                containerStyle={[
                  styles.fontButtonStyle,
                  {opacity: ICON_OPACITY},
                ]}
                onPress={() => this.captionSizePressed()}
              />

              <Icon
                type="material-community"
                name="format-font"
                size={GlobalIconSize - 10}
                color={FONT_ICON_COLOR}
                underlayColor={'black'}
                reverse={true}
                raised
                // iconStyle={{size: 10}}
                reverseColor={CykeeColor}
                containerStyle={[
                  styles.fontButtonStyle,
                  {opacity: ICON_OPACITY},
                ]}
                onPress={() => this.captionFontPressed()}
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
            <TouchableOpacity onPress={() => this.savePhoto(this.state.photo)}>
              <CheckCircle iconSize={70} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </GestureRecognizer>
      // </SafeAreaView>
    );
  }
}

export default PreviewImageScreen;
