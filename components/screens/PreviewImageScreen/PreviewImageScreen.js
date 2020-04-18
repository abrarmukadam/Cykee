import React, {Component} from 'react';
import {View, TextInput, KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import FastImage from 'react-native-fast-image';

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
  render() {
    // let abx =
    //   'file:///storage/emulated/0/Pictures/Cykee/437233e2-bf11-432f-8633-ca175b9741ff.jpg';
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FastImage
          source={{
            uri: this.state.photo.uri,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
        {/* <Image source={{uri: abx}} style={styles.image} /> */}
        <Icon
          name="ios-close"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.crossButtonStyle}
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
    );
  }
}

export default PreviewImageScreen;
