import React, {Component} from 'react';
import {
  Image,
  View,
  TextInput,
  StatusBar,
  BackHandler,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import ImageRotate from 'react-native-image-rotate';
import {Input} from 'react-native-elements';
var RNFS = require('react-native-fs');

import {
  GlobalIconColor,
  GlobalIconSize,
  GlobalMediumIconSize,
  GlobalLargeIconSize,
} from '../../SubComponents/Buttons/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
class EditScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    orignal_photo: this.props.route.params.photo,
    tempPhoto: this.props.route.params.photo,
    text: this.props.route.params.photo.caption,
    prevPhoto: {},
    nextPhoto: {},
  };
  backAction = () => {
    const deletHeader = 'Discard changes ?';
    const deletMessage = '';
    if (
      this.state.orignal_photo != this.state.photo ||
      this.state.orignal_photo.caption != this.state.text
    )
      Alert.alert(
        deletHeader,
        deletMessage,
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
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

    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tempPhoto.source.uri != this.state.tempPhoto.source.uri) {
      this.setState({
        photo: this.state.tempPhoto,
        prevPhoto: prevState.photo,
      });
      console.log('photo changed');
    }
    if (prevProps.photoArray != this.props.photoArray) {
      this.setState({
        photo: this.props.route.params.photo,
        orignal_photo: this.props.route.params.photo,
        tempPhoto: this.props.route.params.photo,
        text: this.props.route.params.photo.caption,
      });
    }
  }

  undoPressed = () => {
    console.log('Undo Pressed');
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
    console.log('redo Pressed');
  };

  crossPressed = () => {
    console.log('crossPressed');
    const deletHeader = 'Discard changes ?';
    const deletMessage = '';
    if (
      this.state.orignal_photo != this.state.photo ||
      this.state.orignal_photo.caption != this.state.text
    )
      Alert.alert(
        deletHeader,
        deletMessage,
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
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
      path: this.state.photo.source.uri,
    }).then(image => {
      image.uri = image.path;
      this.setState({tempPhoto: image});
    });
  };

  rotatePressed = () => {
    let DisplayedPhoto = {};
    console.log(this.state.photo.source.uri);
    ImageRotate.rotateImage(
      this.state.photo.source.uri,
      90,
      uri => {
        DisplayedPhoto.source = {uri: uri};
        DisplayedPhoto.height = this.state.photo.width;
        DisplayedPhoto.width = this.state.photo.heightl;
        this.setState({tempPhoto: DisplayedPhoto});
      },
      error => {
        console.error(error);
      },
    );
  };

  savePhoto = () => {
    let newPhoto = {};
    const temp = this.state.photo.source.uri.split('/');
    console.log('Photo saved in gallery');
    const d = new Date();
    const newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;
    let nameToChange = temp[temp.length - 1];
    let renamedURI = this.state.photo.source.uri.replace(nameToChange, newName);
    RNFS.copyFile(this.state.photo.source.uri, renamedURI).then(() => {
      CameraRoll.save(renamedURI, {
        // CameraRoll.save(this.state.photo.source.uri, {
        type: 'photo',
        album: 'Cykee',
      }).then(uri => {
        console.log('uri:', uri);
        let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';

        newPhoto.height = this.state.photo.height;
        newPhoto.width = this.state.photo.width;
        newPhoto.fileName = newName;
        newPhoto.caption = this.state.text;
        // newPhoto.uri = galleryUri + newPhoto.fileName;
        newPhoto.uri = uri;
        console.log('Photo saved in gallery:', newPhoto);
        this.props.addNewPhoto(newPhoto);
        this.props.navigation.goBack();
      });
    });
  };

  render() {
    // console.log('prevPhoto:', this.state.prevPhoto.uri);
    // console.log('nextPhoto:', this.state.nextPhoto.uri);
    // console.log('OG PHOTO:', this.state.orignal_photo.uri);
    // console.log('Photo:', this.state.photo.uri);
    return (
      <View style={styles.container2} disabled behavior="height">
        <StatusBar hidden={false} />

        <Image
          source={{uri: this.state.photo.source.uri}}
          style={styles.image}
        />
        <Icon
          name="md-save"
          size={GlobalMediumIconSize}
          color={GlobalIconColor}
          style={[
            styles.saveButtonStyle,
            {
              opacity:
                this.state.text == this.state.orignal_photo.caption &&
                this.state.photo.source.uri ==
                  this.state.orignal_photo.source.uri
                  ? 0.5
                  : 1,
            },
          ]}
          disabled={
            this.state.text == this.state.orignal_photo.caption &&
            this.state.photo.source.uri == this.state.orignal_photo.source.uri
              ? true
              : false
          }
          onPress={() => this.savePhoto()}
        />
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
        <Icon
          name="md-undo"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={[
            styles.undoButtonStyle,
            {
              opacity: this.state.prevPhoto.source ? 1 : 0.5,
            },
          ]}
          disabled={this.state.prevPhoto.source ? false : true}
          onPress={() => this.undoPressed()}
        />
        <Icon
          name="md-redo"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={[
            styles.redoButtonStyle,
            {opacity: this.state.nextPhoto.source ? 1 : 0.5},
          ]}
          disabled={this.state.nextPhoto.source ? false : true}
          onPress={() => this.redoPressed()}
        />
        <KeyboardAvoidingView style={styles.textBoxContainer}>
          <Input
            containerStyle={{backgroundColor: 'black'}}
            inputStyle={styles.textInputStyle}
            placeholder={'Add a caption...'}
            placeholderTextColor="grey"
            value={this.state.text}
            // autoFocus
            onChangeText={text => this.setState({text})}
            autoCapitalize="none"
            padding={10}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default EditScreen;
