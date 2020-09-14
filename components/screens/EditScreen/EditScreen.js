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
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import ImageResizer from 'react-native-image-resizer';

import styles from './styles';
import {Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
var RNFS = require('react-native-fs');
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const CykeeColor = EDIT_ICON_COLOR;
const BLANK_CAPTION = 'blankCaption';
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
  saveFileFunction,
  backgroundColorArray,
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
    backColor: this.props.route.params.photo.backColor,
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
    console.log('this.props.route.params.photo', this.props.route.params.photo);
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
              paddingHorizontal: 2,
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
              paddingHorizontal: 2,
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
  changeBackColorPressed = () => {
    console.log('backColor:', this.state.backColor);
    if (this.state.backColor >= backgroundColorArray.length - 1)
      this.setState({backColor: 0});
    else this.setState({backColor: this.state.backColor + 1});
    console.log('change color pressed');
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
    console.log('captionSizePressed:', this.state.captionSize);
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
    console.log('photo:', this.state.photo);

    ImageResizer.createResizedImage(
      this.state.photo.source.uri,
      this.state.photo.height,
      this.state.photo.width,
      'JPEG',
      100,
      90,
      null,
    )
      .then(response => {
        console.log('rotate uri:', response.uri);
        DisplayedPhoto.source = {uri: response.uri};
        DisplayedPhoto.uri = response.uri;
        DisplayedPhoto.height = this.state.photo.width;
        DisplayedPhoto.width = this.state.photo.height;
        this.setState({tempPhoto: DisplayedPhoto, photo: DisplayedPhoto});
      })
      .catch(err => {
        console.log('fail:', err);

        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
  };

  onPressSaveBlankCaption = () => {
    this.props.navigation.navigate('GalleryTab');

    console.log('onPressSaveBlankCaption');
    this.setState({saveInProgress: true});

    let newPhoto = {};
    let index = this.props.route.params.index;
    let updatedPhotoArray = [...this.props.photoArray];

    newPhoto.uri = this.state.orignal_photo.source.uri;
    newPhoto.height = this.state.orignal_photo.height;
    newPhoto.width = this.state.orignal_photo.width;
    newPhoto.caption = this.state.text;
    newPhoto.fav_status = this.state.orignal_photo.fav_status;
    newPhoto.creationDate = this.state.orignal_photo.creationDate;
    newPhoto.captionStyle = {
      captionSize: this.state.orignal_photo.captionSize,
      captionFont: this.state.captionFont,
    };
    newPhoto.tagsArray = this.state.tagsArray;
    newPhoto.type = this.state.orignal_photo.type;
    newPhoto.backColor = this.state.backColor;

    updatedPhotoArray[index] = newPhoto;

    this.props.replacePhotoFromList(updatedPhotoArray);
    // this.props.navigation.goBack();
  };

  onPressSave = () => {
    console.log('onPressSave');

    const saveHeader = 'Save changes ?';
    const saveMessage = 'Overwrite existing photo or Add as new photo?';
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
            text: 'Overwrite',
            onPress: () => {
              // this.overwritePhoto(true);
              this.overwritePhoto(true);

              console.log('Overwrite');
            },
          },
          {
            text: 'Add',
            onPress: () => {
              console.log('Duplicate');
              this.overwritePhoto(false);
              // this.overwritePhoto(false);
            },
          },
        ],
        {cancelable: true},
      );
    else this.props.navigation.goBack();
  };

  overwritePhoto = photo_replace => {
    this.props.navigation.navigate('GalleryTab');

    this.setState({saveInProgress: true});
    let newPhoto = {...this.state.photo};
    newPhoto.uri = this.state.photo.source.uri;

    console.log('photo_new', this.state.photo);
    saveFileFunction({
      data: newPhoto,
      fileType: this.state.orignal_photo.type,
      caption: this.state.text,
      captionStyle: {
        captionSize: this.state.captionSize,
        captionFont: this.state.captionFont,
      },
      fav_status: this.state.orignal_photo.fav_status,
      tagsArray: this.state.tagsArray,
      saveType: photo_replace == true ? 'edit' : 'add',
      callingScreen: 'EditScreen',
      addNewPhoto: newPhoto => this.props.addNewPhoto(newPhoto),
      afterSaveFunction: () => {
        console.log('photo_overwrite_old', this.state.photo);
        console.log('photo_overwrite_new', newPhoto);
        console.log('orignal_photo', this.state.orignal_photo);
        // CameraRoll.deletePhotos([this.state.orignal_photo.source.uri]).then(
        RNFS.unlink(this.state.orignal_photo.source.uri).then(() => {
          let newPhoto = {};
          let index = this.props.route.params.index;
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
          newPhoto.type = this.state.photo.type;

          CameraRoll.getPhotos({
            first: 1,
            // assetType: 'Photos',
            Album: 'Cykee',
          }).then(r => {
            newPhoto.uri = r.edges[0].node.image.uri;
            const temp = newPhoto.uri.split('/');
            console.log('split', temp);
            newPhoto.fileName = temp[temp.length - 1];

            let updatedPhotoArray = [...this.props.photoArray];
            updatedPhotoArray[index] = newPhoto;
            // updatedPhotoArray.splice(1, 1);
            this.props.replacePhotoFromList(updatedPhotoArray);

            console.log('OLD DELETED');
          });
        });
      },
    });
  };
  temp_overwritePhoto = photo_replace => {
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
    const extension =
      this.state.orignal_photo.type == 'video' ? '.mp4' : '.jpeg';
    const d = new Date();
    const month_temp = d.getMonth() + 1;
    let month = '';
    if (month_temp < 10) month = '0' + month_temp;
    else month = month_temp;
    let name_tag = '';
    if (this.state.tagsArray.length > 0)
      for (let i = 0; i < this.state.tagsArray.length; i++)
        name_tag = name_tag + '_' + this.state.tagsArray[i].substr(1);
    let newName = `${d.getFullYear()}${month}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}${name_tag}${extension}`;

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
      <View
        style={[
          styles.container2,
          {backgroundColor: backgroundColorArray[this.state.backColor]},
        ]}
        // disabled
        // behavior="position"
      >
        {this.state.photo.type == BLANK_CAPTION && (
          <View style={[styles.Layout]}>
            <TextInput
              style={[
                styles.AffText,
                {fontFamily: CAPTION_FONT[this.state.captionFont]},
              ]}
              placeholder={'Add a caption...'}
              placeholderTextColor="grey"
              value={this.state.text}
              multiline
              onChangeText={text => {
                if (text.length <= 125) this.setState({text: text});
                else Toast.show('Caption too Long !');
              }}
              autoCapitalize="none"
              padding={10}
              onBlur={() => this.setState({showIcons: true})}
            />
          </View>
        )}
        {/* <StatusBar hidden={false} /> */}
        {this.state.photo.type != BLANK_CAPTION && (
          <TouchableWithoutFeedback
            // onPress={Keyboard.dismiss()}
            onPressIn={() => {
              Keyboard.dismiss();
              console.log('TouchableWithoutFeedback');
              this.props.navigation.setOptions({
                headerShown: !this.state.showIcons,
              });

              this.setState({
                showIcons: !this.state.showIcons,
              });
            }}
            style={styles.image}>
            {/* <View> */}
            <Image
              source={{
                uri: this.state.photo.source.uri,
                priority: FastImage.priority.high,
              }}
              resizeMode={'contain'}
              style={styles.image}
            />
            {/* </View> */}
          </TouchableWithoutFeedback>
        )}

        {this.state.showIcons &&
          this.state.orignal_photo.type != 'video' &&
          this.state.photo.type != BLANK_CAPTION && (
            <EditIconsComponent
              showEditOptions={this.state.showEditOptions}
              cropPressed={this.cropPressed}
              rotatePressed={this.rotatePressed}
              undoPressed={this.undoPressed}
              redoPressed={this.redoPressed}
              prevPhoto={this.state.prevPhoto}
              nextPhoto={this.state.nextPhoto}
              showIconNames={this.props.photoArray.length < 5 ? true : false}
            />
          )}
        <View
          style={[styles.textBoxContainer]}
          // behavior="position"
        >
          {this.state.showIcons && (
            <FontIconsComponent
              type={this.state.photo.type}
              showFontIcons={this.props.showFontIcons}
              captionFontPressed={this.captionFontPressed}
              captionSizePressed={this.captionSizePressed}
              tagPressed={this.tagPressed}
              enterTag={this.state.tagPressed}
              tagsArray={this.state.tagsArray}
              showIconNames={this.props.photoArray.length < 5 ? true : false}
              changeBackColorPressed={this.changeBackColorPressed}
            />
          )}

          <View
            style={{
              width: '100%',
              backgroundColor: 'black',
              // opacity: 0.6,
              paddingRight: 50,
            }}>
            {!this.state.tagPressed && this.state.photo.type != BLANK_CAPTION && (
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
            <TouchableOpacity
              onPress={() => {
                console.log('save pressed');
                if (this.state.orignal_photo.type != BLANK_CAPTION)
                  this.onPressSave();
                else if (
                  (this.state.orignal_photo.type == BLANK_CAPTION &&
                    this.state.text != this.state.orignal_photo.caption) ||
                  this.state.orignal_photo.captionStyle.captionSize !=
                    this.state.captionSize ||
                  this.state.orignal_photo.captionStyle.captionFont !=
                    this.state.captionFont ||
                  this.state.orignal_photo.tagsArray != this.state.tagsArray ||
                  this.state.orignal_photo.backColor != this.state.backColor
                )
                  this.onPressSaveBlankCaption();
                else this.props.navigation.goBack();
              }}>
              <CheckCircle iconSize={60} />
            </TouchableOpacity>
          </View>
        </View>
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
