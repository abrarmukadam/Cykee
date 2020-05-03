import React, {Component} from 'react';
import {
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
import FastImage from 'react-native-fast-image';

var RNFS = require('react-native-fs');

const CykeeColor = EDIT_ICON_COLOR;
import {
  GlobalIconColor,
  GlobalIconSize,
  GalleryIconColor,
  CheckCircle,
  CAPTION_FONT,
  CAPTION_SIZE,
  FontButton,
  SIDE_ICON_COLOR,
  EDIT_ICON_COLOR,
  EditScreenButton,
  FONT_ICON_OPACITY,
} from '../../SubComponents/Buttons/index';

const ICON_OPACITY = 0.6;
const TOP_REF = '10%';

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
    saveInProgress: false,
  };
  backAction = () => {
    const deletHeader = 'Discard changes ?';
    const deletMessage = '';
    if (
      this.state.text != this.state.orignal_photo.caption ||
      this.state.photo.source.uri != this.state.orignal_photo.source.uri ||
      this.state.orignal_photo.captionStyle.captionSize !=
        this.state.captionSize ||
      this.state.orignal_photo.captionStyle.captionFont !=
        this.state.captionFont
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
  };
  captionFontPressed = () => {
    if (this.state.captionFont >= 3) this.setState({captionFont: 0});
    else
      this.setState({
        captionFont: this.state.captionFont + 1,
      });
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

  crossPressed = () => {
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
    const saveHeader = 'Save changes ?';
    const saveMessage = 'Do you want to replace or create a duplicate file?';
    if (
      this.state.text != this.state.orignal_photo.caption ||
      this.state.photo.source.uri != this.state.orignal_photo.source.uri ||
      this.state.orignal_photo.captionStyle.captionSize !=
        this.state.captionSize ||
      this.state.orignal_photo.captionStyle.captionFont !=
        this.state.captionFont
    )
      Alert.alert(
        saveHeader,
        saveMessage,
        [
          {
            text: 'Replace',
            onPress: () => {
              this.savePhoto(true);
              console.log('Replace');
            },
          },
          {
            text: 'Duplicate',
            onPress: () => {
              console.log('Duplicate');
              this.savePhoto(false);
            },
          },
        ],
        {cancelable: true},
      );
  };
  savePhoto = photo_replace => {
    this.setState({saveInProgress: true});
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
        {/* <StatusBar hidden={false} /> */}
        <FastImage
          source={{
            uri: this.state.photo.source.uri,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
        <View style={{position: 'absolute', top: '10%', right: -10}}>
          <EditScreenButton
            iconType="ionicon"
            iconName="ios-more"
            topPosition={20}
            handleOnPress={() =>
              this.setState({
                showEditOptions: !this.state.showEditOptions,
              })
            }
          />
          {this.state.showEditOptions && this.state.prevPhoto.source && (
            <EditScreenButton
              iconType="ionicon"
              iconName="md-undo"
              topPosition={170}
              handleOnPress={this.undoPressed}
            />
          )}
          {this.state.showEditOptions && this.state.nextPhoto.source && (
            <EditScreenButton
              iconType="ionicon"
              iconName="md-redo"
              topPosition={170}
              handleOnPress={this.redoPressed}
            />
          )}
          {this.state.showEditOptions && (
            <EditScreenButton
              iconType="ionicon"
              iconName="md-crop"
              topPosition={70}
              handleOnPress={this.cropPressed}
            />
          )}
          {this.state.showEditOptions && (
            <EditScreenButton
              iconType="material-community"
              iconName="rotate-right"
              topPosition={120}
              handleOnPress={this.rotatePressed}
            />
          )}
        </View>
        <KeyboardAvoidingView style={[styles.textBoxContainer]}>
          <View style={{flexDirection: 'row'}}>
            {this.state.showFontIcons && (
              <Icon
                type={'entypo'}
                name={'chevron-small-right'}
                size={GlobalIconSize - 10}
                color={'#0000'}
                reverse
                reverseColor={CykeeColor}
                containerStyle={{
                  opacity: FONT_ICON_OPACITY,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() =>
                  this.setState({
                    showFontIcons: !this.state.showFontIcons,
                  })
                }
              />
            )}
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
            {!this.state.showFontIcons && (
              <Icon
                type={'entypo'}
                name={'chevron-small-left'}
                size={GlobalIconSize - 10}
                color={'#0000'}
                reverseColor={CykeeColor}
                reverse
                containerStyle={{
                  opacity: FONT_ICON_OPACITY,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: -10,
                }}
                onPress={() =>
                  this.setState({
                    showFontIcons: !this.state.showFontIcons,
                  })
                }
              />
            )}
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: 'black',
              // opacity: 0.6,
              paddingRight: 50,
            }}>
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
              onChangeText={text => this.setState({text})}
              autoCapitalize="none"
              padding={10}
            />
          </View>
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
                  : this.state.saveInProgress //false
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
