import React, {Component} from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import FastImage from 'react-native-fast-image';
import GestureRecognizer from 'react-native-swipe-gestures';
var RNFS = require('react-native-fs');

import {
  GlobalIconColor,
  GlobalIconSize,
} from '../../SubComponents/Buttons/index';

class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    text: '',
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
        newPhoto.uri = galleryUri + newPhoto.fileName;
        // newPhoto.uri = uri;
        console.log('Photo saved in gallery:', newPhoto);
        this.props.addNewPhoto(newPhoto);
        this.props.navigation.navigate('Home');
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
          flex: 1,
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
          <View style={styles.textBoxContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder={'Add a caption...'}
              placeholderTextColor="grey"
              value={this.state.text}
              // autoFocus
              onChangeText={text => this.setState({text})}
              autoCapitalize="none"
              padding={10}
            />
            <Icon
              name="md-send"
              size={GlobalIconSize}
              color={GlobalIconColor}
              style={styles.saveButtonStyle}
              onPress={() => this.savePhoto(this.state.photo)}
            />
          </View>
        </KeyboardAvoidingView>
      </GestureRecognizer>
      // </SafeAreaView>
    );
  }
}

export default PreviewImageScreen;
