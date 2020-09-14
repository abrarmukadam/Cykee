import React, {Component} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StatusBar,
  Alert,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';

import styles from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';

import CameraRoll from '@react-native-community/cameraroll';

import Gallery from 'react-native-image-gallery';
import GallerySwiper from 'react-native-gallery-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';

import FastImage from 'react-native-fast-image';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
var RNFS = require('react-native-fs');

import {CaptionComponent} from '../../index';
import {
  GlobalIconColor,
  GlobalIconSize,
  TEXT_BUTTON_COLOR,
  GalleryIconColor,
  TAB_BAR_COLOR,
  BLANK_CAPTION,
  PlayVideoComponent,
} from '../../SubComponents/Buttons/index';
import {
  ShareIcon,
  FavouriteIcon,
  DeleteIcon,
  EditIcon,
  MoreIcon,
  GalleryIcon,
  TagDisplayComponent,
  PlayOverlay,
  BlankCaptionDisplay,
  CAPTION_FONT,
  backgroundColorArray,
} from '../../SubComponents/Buttons/index';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const SCREEN_RATIO = HEIGHT / WIDTH;

class GalleryScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    optionsAvailable: true,
    showCapion: true,
    toBeDisplayed: this.props.route.params.toBeDisplayed || [],
    images: [],
    index: this.props.route.params.index,
    photoArray: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.photoArray != this.props.photoArray) {
      let temp = [];
      this.state.toBeDisplayed.map(item => {
        let newItem = {
          uri: item.uri,
          url: item.uri,
          source: {uri: item.uri},
          height: item.height,
          width: item.width,
          fav_status: item.fav_status,
          caption: item.caption,
          captionStyle: item.captionStyle,
          creationDate: item.creationDate || [' ', ' '],
          tagsArray: item.tagsArray || [],
          type: item.type,
          backColor: item.backColor,
          fileName: item.fileName,
        };
        temp = [...temp, newItem];
        // item.dimension={{item.height,item.width}}
      });
      this.setState({photoArray: temp});
      console.log('did update');
    }
    if (
      prevProps.photoArray[0] == this.props.photoArray[1] &&
      this.props.photoArray[0]
    ) {
      console.log('ADDED TO CYKEE GALLERY');
      Toast.show('Added to Cykee Gallery !');
    }
    // if (this.props.route.params.index != prevProps.route.params.index) {
    //   this.setState({index: this.props.route.params.index});
    //   console.log('loading index2:', this.props.route.params.index);
    // }
    // if (prevState.optionsAvailable != this.state.optionsAvailable)
    //   this.props.navigation.setOptions({
    //     headerShown: this.state.optionsAvailable ? true : false,
    //   });
  }
  componentWillUnmount() {
    console.log('Gallery Screen did-unmount');
    changeNavigationBarColor(TAB_BAR_COLOR);
  }
  async componentDidMount() {
    console.log('did mount');
    let temp = [];
    this.state.toBeDisplayed.map(item => {
      let newItem = {
        uri: item.uri,
        // url: item.uri,
        url:
          item.uri == BLANK_CAPTION
            ? 'https://thumbs.dreamstime.com/b/transparent-designer-must-have-fake-background-39672616.jpg'
            : item.uri,
        source: {uri: item.uri},
        height: item.uri == BLANK_CAPTION ? '100%' : item.height,
        width: item.uri == BLANK_CAPTION ? '100%' : item.width,
        fav_status: item.fav_status,
        caption: item.caption,
        captionStyle: item.captionStyle,
        creationDate: item.creationDate || [' ', ' '],
        tagsArray: item.tagsArray || [],
        type: item.type,
        backColor: item.backColor,
        fileName: item.fileName,
      };
      temp = [...temp, newItem];
    });
    this.setState({photoArray: temp, showCapion: !this.props.hideCaption});

    // this.props.navigation.setOptions({
    // headerTransparent: true,
    // headerStyle: {
    //   backgroundColor: '#0000',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    // headerRight: () => this.rightHeaderButton,
    // });
    const response1 = await changeNavigationBarColor(TAB_BAR_COLOR);

    this.props.photo_loaded();
  }
  rightHeaderButton = (
    <TouchableOpacity
      onPress={() => this.onPressGallery()}
      style={[styles.IconContainer, {flex: 0}]}>
      <GalleryIcon iconColor="white" />
    </TouchableOpacity>
  );
  onPressGallery = () => {
    this.props.navigation.push('GalleryTab');
    // this.setState({index: 0});
    console.log('Gallery Pressed');
  };
  onPressShare = item => {
    console.log('Share Pressed');
    console.log(item.source.uri);
    const shareOptions = {
      type: 'image',
      urls: [item.source.uri],
      message: item.caption,
      subject: item.caption,
      title: item.caption,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  onPressFav = item => {
    console.log('Favorite Pressed');
    this.props.favPhoto(this.props.photoArray, item.fileName);
  };
  onPressEdit = item => {
    this.props.navigation.navigate('EditScreen', {
      photo: item,
      index: this.props.photoArray.indexOf(
        this.state.toBeDisplayed[this.state.index],
      ),
    });
    console.log('Edit Pressed');
  };
  onPressDelete = index => {
    console.log('Delete Pressed');
    const deletHeader = 'Delete Photo ?';
    const deletMessage = 'Do you wish to Delete the selected Photo?';
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
            if (this.props.route.params.navigatingFrom == 'CameraRollScreen')
              CameraRoll.deletePhotos([
                this.state.photoArray[index].source.uri,
              ]).then(() => {
                console.log('File delete success-CAMERA ROLL');
                this.props.navigation.navigate('GalleryTab');
              });
            else {
              let updatedPhotoArray = [...this.props.photoArray];
              let deleteIndex = this.props.photoArray.indexOf(
                this.state.toBeDisplayed[index], //item to be deleted should match the item in photoArray Props
              );
              updatedPhotoArray.splice(deleteIndex, 1);

              console.log('updatedPhotoArray:', updatedPhotoArray);
              this.props.deletePhotoFromList(updatedPhotoArray);

              let newToBeDisplayed = [...this.props.route.params.toBeDisplayed];
              newToBeDisplayed.splice(this.state.index, 1);
              console.log('photo deleted');
              console.log(this.state.photoArray[index].source.uri);

              RNFS.unlink(this.state.photoArray[index].source.uri).then(() => {
                console.log('FILE DELETED');
              });

              // CameraRoll.deletePhotos([
              //   this.state.photoArray[index].source.uri,
              // ]).then(() => {
              //   console.log('File delete success-CYKEE');
              // });
              this.props.navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  onPressMore = () => {
    console.log('More Pressed');
  };

  render() {
    console.log('galleryScreenRendered');
    // hideNavigationBar();
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    // console.log('type:', this.state.photoArray[this.state.index].type);
    let ImageRatio = 3;
    if (this.state.photoArray[0]) {
      ImageRatio =
        this.state.photoArray[this.state.index].height /
        this.state.photoArray[this.state.index].width;
    } else ImageRatio = 1;
    // if (ImageRatio == SCREEN_RATIO)
    console.log('captionStyle:', this.state.photoArray[this.state.index]);
    return (
      <View style={styles.container}>
        {/* <StatusBar
          hidden={false}
          // backgroundColor={'black'}
          // translucent
        /> */}
        {/* <StatusBar backgroundColor={'transparent'} translucent /> */}
        {/* <StatusBar hidden={!this.state.optionsAvailable} /> */}
        {this.state.photoArray[0] && (
          <View
            style={{
              // flex: 1,
              height: '101%',
              width: '100%',
              psition: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              // top: 0,
              backgroundColor: this.state.photoArray[this.state.index].backColor
                ? backgroundColorArray[
                    this.state.photoArray[this.state.index].backColor
                  ]
                : 'black',
              justifyContent: 'center',
            }}>
            <ImageViewer
              imageUrls={this.state.photoArray}
              // style={{
              //   // flex: 1,
              //   height: '100%',
              //   width: '100%',
              // }}
              index={this.state.index}
              flipThreshold={10}
              onClick={() => {
                this.setState({
                  optionsAvailable: !this.state.optionsAvailable,
                });
                changeNavigationBarColor(
                  !this.state.optionsAvailable ? 'black' : TAB_BAR_COLOR,
                );
              }}
              onChange={index => {
                this.setState({index: index});
                console.log('index:', index);
              }}
              enableSwipeDown={true}
              onSwipeDown={() => this.props.navigation.goBack()}
              swipeDownThreshold={1}
              backgroundColor="#0000"
              enablePreload={true}
              saveToLocalByLongPress={false}
              useNativeDriver={true}
              renderIndicator={() => {}}
              // onMove={() => console.log('MOVING')}
              renderHeader={() =>
                this.state.photoArray[this.state.index].type ==
                  'blankCaption' && (
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor:
                        backgroundColorArray[
                          this.state.photoArray[this.state.index].backColor
                        ],
                      position: 'absolute',
                      bottom: 0,
                      // borderColor: 'red',
                      // borderWidth: 2,
                    }}>
                    <BlankCaptionDisplay
                      caption={this.state.photoArray[this.state.index].caption}
                      backColor={
                        this.state.photoArray[this.state.index].backColor
                      }
                      captionFont={
                        CAPTION_FONT[
                          this.state.photoArray[this.state.index].captionStyle
                            .captionFont
                        ]
                      }
                    />
                  </View>
                )
              }
            />
            {this.state.photoArray[this.state.index].type == 'video' && (
              <PlayOverlay
                onPressPlay={() => {
                  console.log('Play video Pressed');
                  this.props.navigation.navigate('PlayVideoScreen', {
                    video: this.state.photoArray[this.state.index],
                  });
                  // saveFileFunction();
                }}
              />
            )}
          </View>
        )}

        <View style={[styles.bottomContainer]}>
          <TouchableOpacity
            onPress={() => this.setState({showCapion: !this.state.showCapion})}
            style={{
              // paddingTop: 10,
              // borderWidth: 0.01,
              justifyContent: 'space-between',
              flexDirection: 'column',
              flex: 1,
            }}>
            <Icon
              type="font-awesome"
              name={
                this.state.showCapion
                  ? ''
                  : this.state.photoArray[this.state.index].caption
                  ? 'angle-up'
                  : ''
              }
              size={GlobalIconSize}
              color="white"
              // style={{position: 'absolute', top: 0}}
            />
            {this.state.showCapion && (
              <CaptionComponent
                caption={
                  this.state.photoArray[this.state.index]
                    ? this.state.photoArray[this.state.index].type !=
                      'blankCaption'
                      ? this.state.photoArray[this.state.index].caption
                      : ''
                    : ''
                }
                captionStyle={
                  this.state.photoArray[this.state.index]
                    ? this.state.photoArray[this.state.index].captionStyle
                    : {captionSize: 20, captionFont: 'normal'}
                }
              />
            )}
          </TouchableOpacity>

          {this.state.optionsAvailable && (
            <View style={styles.bottomSubContainer}>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() =>
                  this.onPressShare(this.state.photoArray[this.state.index])
                }>
                <ShareIcon />
                <Text style={styles.IconTextStyle}>Share</Text>
              </TouchableOpacity>
              {this.props.route.params.navigatingFrom != 'CameraRollScreen' && (
                <TouchableOpacity
                  style={styles.IconContainer}
                  onPress={() => {
                    this.onPressFav(this.state.photoArray[this.state.index]);
                  }}>
                  <FavouriteIcon
                    fav_status={
                      this.state.photoArray[this.state.index]
                        ? this.state.photoArray[this.state.index].fav_status
                        : false
                    }
                  />
                  <Text style={styles.IconTextStyle}>Favorite</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => {
                  const photo = this.state.photoArray[this.state.index];
                  if (
                    this.props.route.params.navigatingFrom != 'CameraRollScreen'
                  )
                    this.onPressEdit(photo);
                  else {
                    photo.uri = photo.source.uri;
                    this.props.navigation.push('PreviewScreen', {
                      photo: photo,
                      navigatingFrom: 'CameraRoll',
                    });
                    console.log('EDIT DONE & RETURNED');
                  }
                }}>
                <EditIcon
                  iconName={
                    this.props.route.params.navigatingFrom == 'CameraRollScreen'
                      ? 'addToCykee'
                      : 'Edit'
                  }
                />
                <Text style={styles.IconTextStyle}>
                  {this.props.route.params.navigatingFrom == 'CameraRollScreen'
                    ? 'Add to Cykee'
                    : 'Edit'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.onPressDelete(this.state.index)}>
                <DeleteIcon />
                <Text style={styles.IconTextStyle}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.props.navigation.goBack()}>
                <GalleryIcon />

                <Text style={styles.IconTextStyle}>Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {this.state.optionsAvailable && (
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.backButtonStyle}
              onPress={() => {
                this.props.navigation.goBack();
                console.log('Back Pressed');
              }}>
              <Icon
                type="feather"
                name="arrow-left"
                size={GlobalIconSize - 4}
                color={'black'}
              />
            </TouchableOpacity>
            <View style={styles.tagStyle}>
              <TagDisplayComponent
                tagsArray={
                  this.state.photoArray[this.state.index]
                    ? this.state.photoArray[this.state.index].tagsArray
                    : ['']
                }
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                // height: 40,
                // width: 100,
              }}>
              <Text style={styles.dateStyle}>
                {this.state.photoArray[this.state.index]
                  ? this.state.photoArray[this.state.index].creationDate[0]
                  : ' '}
              </Text>
              <Text style={styles.timeStyle}>
                {this.state.photoArray[this.state.index]
                  ? this.state.photoArray[this.state.index].creationDate[1]
                  : ' '}
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => this.onPressGallery()}
              style={[styles.IconContainer, {flex: 0}]}>
              <GalleryIcon />
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    );
  }
}

export default GalleryScreen;
