import React, {Component} from 'react';
import {
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  ImageEditor,
  Alert,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import ImageRotate from 'react-native-image-rotate';

import {
  GlobalIconColor,
  GlobalIconSize,
} from '../../SubComponents/Buttons/index';
class EditScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    tempPhoto: this.props.route.params.photo,
    text: this.props.route.params.photo.caption,
  };
  crossPressed = () => {
    console.log('crossPressed');
    const deletHeader = 'Discard changes ?';
    const deletMessage = '';
    if (
      this.state.photo != this.state.tempPhoto ||
      this.state.photo.caption != this.state.text
    )
      Alert.alert(
        deletHeader,
        deletMessage,
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    else this.props.navigation.goBack();
  };
  cropPressed = () => {
    ImagePicker.openCropper({
      freeStyleCropEnabled: true,
      path: this.state.tempPhoto.uri,
    }).then(image => {
      image.uri = image.path;
      this.setState({tempPhoto: image});
    });
  };

  rotatePressed = () => {
    let DisplayedPhoto = {};
    console.log(this.state.photo.uri);
    ImageRotate.rotateImage(
      this.state.tempPhoto.uri,
      90,
      uri => {
        DisplayedPhoto.uri = uri;
        DisplayedPhoto.height = this.state.tempPhoto.width;
        DisplayedPhoto.width = this.state.tempPhoto.heightl;
        this.setState({tempPhoto: DisplayedPhoto});
      },
      error => {
        console.error(error);
      },
    );
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
    this.props.navigation.goback();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} disabled behavior="height">
        <Image source={{uri: this.state.tempPhoto.uri}} style={styles.image} />
        {/* <Image source={{uri: abx}} style={styles.image} /> */}
        <Icon
          name="ios-close"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.crossButtonStyle}
          onPress={() => this.crossPressed()}
        />
        <Icon
          name="md-crop"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.cropButtonStyle}
          onPress={() => this.cropPressed()}
        />
        <Icon
          name="md-refresh"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.rotateButtonStyle}
          onPress={() => this.rotatePressed()}
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

export default EditScreen;
