import React, {Component} from 'react';
import {
  View,
  TextInput,
  StatusBar,
  BackHandler,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import ImageRotate from 'react-native-image-rotate';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
var RNFS = require('react-native-fs');
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

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
  FONT_ICON_COLOR,
  TAB_BAR_COLOR,
  EditIconsComponent,
  FontIconsComponent,
  TagComponent,
  TagDisplayComponent,
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
    showIcons: true,
    tagsArray: this.props.route.params.photo.tagsArray || [],
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
        this.state.captionFont ||
      this.state.orignal_photo.tagsArray != this.state.tagsArray
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
    changeNavigationBarColor('black');

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
        // fontWeight: 'bold',
        fontSize: 24,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.crossPressed()}
          // style={{paddingLeft: 20}}
          style={{
            // paddingLeft: 20,
            marginLeft: 20,
          }}
          // style={[styles.IconContainer, {flex: 0}]}
        >
          <View
            style={{
              backgroundColor: 'grey',
              paddingHorizontal: 7,
              borderRadius: 20,
              opacity: 0.2,
            }}>
            <Icon
              type="ionicon"
              name="md-close"
              size={GlobalIconSize}
              color={'white'}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 7,
              borderRadius: 20,
              position: 'absolute',
            }}>
            <Icon
              type="ionicon"
              name="md-close"
              size={GlobalIconSize}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
        // <Icon
        //   type="ionicon"
        //   name="ios-close"
        //   underlayColor={'#0000'}
        //   iconStyle={styles.elevationStyle}
        //   size={GlobalIconSize}
        //   color={GlobalIconColor}
        //   containerStyle={styles.crossButtonStyle}
        //   onPress={() => this.crossPressed()}
        // />
      ),
    });
  }
  tagPressed = () => {
    this.setState({tagPressed: !this.state.tagPressed});
  };
  tagsArrayChanged = tagsArray => {
    this.setState({tagsArray});
    // this.props.autoTagSetting(tagsArray[0]);
    // console.log(tagsArray);
  };

  componentWillUnmount() {
    changeNavigationBarColor(TAB_BAR_COLOR);

    this.backHandler.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tempPhoto.source.uri != this.state.tempPhoto.source.uri) {
      this.setState({
        photo: this.state.tempPhoto,
        prevPhoto: prevState.photo,
        nextPhoto: {},
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
    const saveMessage = 'Update existing photo or Add as new photo?';
    if (
      this.state.text != this.state.orignal_photo.caption ||
      this.state.photo.source.uri != this.state.orignal_photo.source.uri ||
      this.state.orignal_photo.captionStyle.captionSize !=
        this.state.captionSize ||
      this.state.orignal_photo.captionStyle.captionFont !=
        this.state.captionFont ||
      this.state.orignal_photo.tagsArray != this.state.tagsArray
    )
      Alert.alert(
        saveHeader,
        saveMessage,
        [
          {
            text: 'Update',
            onPress: () => {
              this.savePhoto(true);
              console.log('Replace');
            },
          },
          {
            text: 'Add',
            onPress: () => {
              console.log('Duplicate');
              this.savePhoto(false);
            },
          },
        ],
        {cancelable: true},
      );
    else this.props.navigation.goBack();
  };
  savePhoto = photo_replace => {
    this.props.navigation.navigate('GalleryTab');

    this.setState({saveInProgress: true});
    let newPhoto = {};
    let galleryUri = 'file:///storage/emulated/0/Pictures/Cykee/';

    newPhoto.height = this.state.photo.height;
    newPhoto.width = this.state.photo.width;
    newPhoto.caption = this.state.text;
    newPhoto.fav_status = this.state.orignal_photo.fav_status;
    newPhoto.creationDate = this.state.orignal_photo.creationDate;
    newPhoto.captionStyle = {
      captionSize: this.state.captionSize,
      captionFont: this.state.captionFont,
    };
    newPhoto.tagsArray = this.state.tagsArray;

    let orignal_temp = this.state.orignal_photo.source.uri.split('/');
    let orignalName = orignal_temp[orignal_temp.length - 1];

    const d = new Date();
    let newName = `${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}.jpg`;

    const temp = this.state.photo.source.uri.split('/');
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
                newName = orignalName;
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
        } else {
          newPhoto.creationDate = [
            moment().format('MMM DD, YYYY'),
            moment().format('hh:mm:ss a'),
          ];
          CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos',
            Album: 'Cykee',
          }).then(r => {
            newPhoto.uri = r.edges[0].node.image.uri;
            this.props.addNewPhoto(newPhoto);
          });
        }
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
              uri: this.state.photo.source.uri,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
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
        <KeyboardAvoidingView style={[styles.textBoxContainer]}>
          {this.state.showIcons && (
            <FontIconsComponent
              showFontIcons={this.props.showFontIcons}
              captionFontPressed={this.captionFontPressed}
              captionSizePressed={this.captionSizePressed}
              tagPressed={this.tagPressed}
              enterTag={this.state.tagPressed}
              tagsArray={this.state.tagsArray}
            />
          )}

          <View
            style={{
              width: '100%',
              backgroundColor: 'black',
              // opacity: 0.6,
              paddingRight: 50,
            }}>
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
                onChangeText={text => this.setState({text})}
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
          <View style={styles.saveButtonStyle}>
            <TouchableOpacity onPress={() => this.onPressSave()}>
              <CheckCircle iconSize={60} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {this.state.showIcons && (
          <TouchableOpacity
            onPress={() => this.setState({tagPressed: true})}
            style={{
              position: 'absolute',
              top: 80,
              left: 20,
              // borderColor: 'red',
              // borderWidth: 1,
              // flexWrap: 'wrap',
            }}>
            <TagDisplayComponent
              tagsArray={this.state.tagsArray ? this.state.tagsArray : ['']}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default EditScreen;
