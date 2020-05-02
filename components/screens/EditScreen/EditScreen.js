import React, {Component} from 'react';
import {
  Image,
  View,
  TextInput,
  StatusBar,
  BackHandler,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import ImageRotate from 'react-native-image-rotate';
import {Input} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {EDIT_ICON_COLOR} from '../../SubComponents/Buttons/index';

var RNFS = require('react-native-fs');
const ICON_OPACITY = 0.6;
const SIDE_ICON_COLOR = '#606060ff';
const CykeeColor = EDIT_ICON_COLOR;
import {
  GlobalIconColor,
  GlobalIconSize,
  GlobalMediumIconSize,
  GlobalLargeIconSize,
  GalleryIconColor,
  CheckCircle,
  CAPTION_FONT,
  CAPTION_SIZE,
} from '../../SubComponents/Buttons/index';
class EditScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    photo: this.props.route.params.photo,
    orignal_photo: this.props.route.params.photo,
    tempPhoto: this.props.route.params.photo,
    text: this.props.route.params.photo.caption,
    captionSize: this.props.route.params.photo.captionStyle.captionSize,
    captionFont: this.props.route.params.photo.captionStyle.captionFont,
    prevPhoto: {},
    nextPhoto: {},
    showEditOptions: true,
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

    this.props.navigation.setOptions({
      headerTransparent: true,
      headerStyle: {
        backgroundColor: '#0000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <Icon
          type="ionicon"
          name="ios-close"
          underlayColor={'#0000'}
          iconStyle={styles.elevationStyle}
          size={GlobalIconSize}
          color={GlobalIconColor}
          containerStyle={styles.crossButtonStyle}
          onPress={() => this.crossPressed()}
        />
      ),
    });
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
  captionSizePressed = () => {
    if (this.state.captionSize >= 2) this.setState({captionSize: 0});
    else this.setState({captionSize: this.state.captionSize + 1});
    console.log('captionSize Pressed', this.state.captionSize);
  };
  captionFontPressed = () => {
    if (this.state.captionFont >= 3) this.setState({captionFont: 0});
    else
      this.setState({
        captionFont: this.state.captionFont + 1,
      });

    console.log('captionFont Pressed', this.state.captionFont);
  };

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
      image.source = {uri: image.path};
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

  onPressSave = () => {
    console.log('SavePressed');
    const saveHeader = 'Save changes ?';
    const saveMessage = 'Do you want to replace or create a duplicate file?';
    if (
      this.state.orignal_photo != this.state.photo ||
      this.state.orignal_photo.caption != this.state.text
    )
      Alert.alert(
        saveHeader,
        saveMessage,
        [
          {
            text: 'Duplicate',
            onPress: () => {
              console.log('Duplicate');
              this.savePhoto(false);
            },
          },
          {
            text: 'Replace',
            onPress: () => {
              this.savePhoto(true);

              console.log('Replace');
            },
          },
        ],
        {cancelable: true},
      );
  };
  savePhoto = photo_replace => {
    let newPhoto = {};
    let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';

    newPhoto.height = this.state.photo.height;
    newPhoto.width = this.state.photo.width;
    newPhoto.caption = this.state.text;
    newPhoto.fav_status = this.state.orignal_photo.fav_status;
    newPhoto.captionStyle = {
      captionSize: this.state.captionSize,
      captionFont: this.state.captionFont,
    };

    let oldTemp = this.state.orignal_photo.source.uri.split('/');
    let oldName = oldTemp[oldTemp.length - 1];

    const temp = this.state.photo.source.uri.split('/');
    console.log('Photo saved in gallery');

    const d = new Date();
    let newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;

    let nameToChange = temp[temp.length - 1];

    let renamedURI = this.state.photo.source.uri.replace(nameToChange, newName);

    RNFS.copyFile(this.state.photo.source.uri, renamedURI).then(() => {
      if (photo_replace) {
        CameraRoll.deletePhotos([this.state.orignal_photo.source.uri]).then(
          () => {
            RNFS.copyFile(renamedURI, this.state.orignal_photo.source.uri).then(
              () => {
                CameraRoll.deletePhotos([renamedURI]);
                renamedURI = this.state.orignal_photo.source.uri;
                newName = oldName;
              },
            );
          },
        );
      }
      CameraRoll.save(renamedURI, {
        type: 'photo',
        album: 'Cykee',
      }).then(uri => {
        console.log('uri:', uri);
        newPhoto.fileName = newName;
        newPhoto.uri = galleryUri + newPhoto.fileName;

        if (photo_replace) {
          //delete old uri & replace in photoArray with photo
          let index = this.props.route.params.index;
          console.log(index);
          let updatedPhotoArray = [...this.props.photoArray];
          updatedPhotoArray[index] = newPhoto;
          this.props.replacePhotoFromList(updatedPhotoArray);
        } else this.props.addNewPhoto(newPhoto); //add to photoArray if Creating duplicate

        this.props.navigation.navigate('GalleryTab');
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
        <FastImage
          source={{
            uri: this.state.photo.source.uri,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
        <Icon
          type="ionicon"
          name="ios-more"
          size={GlobalIconSize - 10}
          color={SIDE_ICON_COLOR}
          underlayColor={'black'}
          reverse={true}
          reverseColor={CykeeColor}
          containerStyle={[
            styles.sideButtonStyle,
            {top: 10, opacity: ICON_OPACITY},
          ]}
          onPress={() =>
            this.setState({showEditOptions: !this.state.showEditOptions})
          }
        />
        {this.state.showEditOptions && this.state.prevPhoto.source && (
          <Icon
            type="ionicon"
            name="md-undo"
            size={GlobalIconSize - 10}
            color={SIDE_ICON_COLOR}
            // underlayColor={'black'}
            reverse={true}
            reverseColor={CykeeColor}
            containerStyle={[
              styles.sideButtonStyle,
              {
                top: 300,
                opacity: ICON_OPACITY,
                // opacity: this.state.prevPhoto.source ? 1 : 0.5
              },
            ]}
            disabledStyle={{backgroundColor: GalleryIconColor}}
            disabled={this.state.prevPhoto.source ? false : true}
            onPress={() => this.undoPressed()}
          />
        )}
        {this.state.showEditOptions && this.state.nextPhoto.source && (
          <Icon
            type="ionicon"
            name="md-redo"
            disabledStyle={{backgroundColor: GalleryIconColor}}
            size={GlobalIconSize - 10}
            color={SIDE_ICON_COLOR}
            // underlayColor={'black'}
            reverse={true}
            reverseColor={CykeeColor}
            containerStyle={[
              styles.sideButtonStyle,
              {
                top: 300,
                opacity: ICON_OPACITY,
                // opacity: this.state.nextPhoto.source ? 1 : 0.5
              },
            ]}
            disabled={this.state.nextPhoto.source ? false : true}
            onPress={() => this.redoPressed()}
          />
        )}
        {this.state.showEditOptions && (
          <Icon
            type="ionicon"
            name="ios-crop"
            size={GlobalIconSize - 10}
            color={SIDE_ICON_COLOR}
            underlayColor={'#0000'}
            reverse={true}
            reverseColor={CykeeColor}
            containerStyle={[
              styles.sideButtonStyle,
              {top: 60, opacity: ICON_OPACITY},
            ]}
            onPress={() => this.cropPressed()}
          />
        )}
        {this.state.showEditOptions && (
          <Icon
            type="material-community"
            name="rotate-right"
            size={GlobalIconSize - 10}
            color={SIDE_ICON_COLOR}
            underlayColor={'black'}
            reverse={true}
            raised
            // iconStyle={{size: 10}}
            reverseColor={CykeeColor}
            containerStyle={[
              styles.sideButtonStyle,
              {top: 120, opacity: ICON_OPACITY},
            ]}
            onPress={() => this.rotatePressed()}
          />
        )}
        {this.state.showEditOptions && (
          <Icon
            type="material-community"
            name="format-size"
            size={GlobalIconSize - 10}
            color={SIDE_ICON_COLOR}
            underlayColor={'black'}
            reverse={true}
            // raised
            reverseColor={CykeeColor}
            containerStyle={[
              styles.sideButtonStyle,
              {top: 180, opacity: ICON_OPACITY},
            ]}
            onPress={() => this.captionSizePressed()}
          />
        )}
        {this.state.showEditOptions && (
          <Icon
            type="material-community"
            name="format-font"
            size={GlobalIconSize - 10}
            color={SIDE_ICON_COLOR}
            underlayColor={'black'}
            reverse={true}
            raised
            // iconStyle={{size: 10}}
            reverseColor={CykeeColor}
            containerStyle={[
              styles.sideButtonStyle,
              {top: 240, opacity: ICON_OPACITY},
            ]}
            onPress={() => this.captionFontPressed()}
          />
        )}

        <KeyboardAvoidingView style={[styles.textBoxContainer, {opacity: 0.6}]}>
          <TextInput
            containerStyle={{backgroundColor: SIDE_ICON_COLOR}}
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
          <View style={styles.saveButtonStyle}>
            <TouchableOpacity
              style={{
                opacity:
                  this.state.text == this.state.orignal_photo.caption &&
                  this.state.photo.source.uri ==
                    this.state.orignal_photo.source.uri &&
                  this.state.orignal_photo.captionStyle.captionSize ==
                    this.state.captionSize &&
                  this.state.orignal_photo.captionStyle.captionFont ==
                    this.state.captionFont
                    ? 0.5
                    : 1,
              }}
              disabled={
                this.state.text == this.state.orignal_photo.caption &&
                this.state.photo.source.uri ==
                  this.state.orignal_photo.source.uri &&
                this.state.orignal_photo.captionStyle.captionSize ==
                  this.state.captionSize &&
                this.state.orignal_photo.captionStyle.captionFont ==
                  this.state.captionFont
                  ? true
                  : false
              }
              onPress={() => this.onPressSave()}>
              <CheckCircle iconSize={60} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default EditScreen;
