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

import {
  GlobalIconColor,
  GlobalIconSize,
} from '../../SubComponents/Buttons/index';
import {SafeAreaView} from 'react-native-safe-area-context';

class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    text: '',
  };
  savePhoto = photo => {
    let newPhoto = {};
    const temp = photo.uri.split('/');
    console.log('Photo saved in gallery');
    CameraRoll.save(this.state.photo.uri, {
      type: 'photo',
      album: 'Cykee',
    });

    newPhoto.height = photo.height;
    newPhoto.width = photo.width;

    let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';
    newPhoto.fileName = temp[temp.length - 1];
    newPhoto.caption = this.state.text;
    newPhoto.uri = galleryUri + newPhoto.fileName;
    console.log('Photo saved in gallery:', newPhoto);
    this.props.addNewPhoto(newPhoto);
    this.props.navigation.navigate('Home');
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
            resizeMode={FastImage.resizeMode.contain}
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
