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
  ToastAndroid,
} from 'react-native';
import Share from 'react-native-share';

import styles from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';

import CameraRoll from '@react-native-community/cameraroll';

import Gallery from 'react-native-image-gallery';
import GallerySwiper from 'react-native-gallery-swiper';

import FastImage from 'react-native-fast-image';
import GestureRecognizer from 'react-native-swipe-gestures';

import {CaptionComponent} from '../../index';
import {
  GlobalIconColor,
  GlobalIconSize,
  GalleryIconColor,
} from '../../SubComponents/Buttons/index';
import {
  ShareIcon,
  FavouriteIcon,
  DeleteIcon,
  EditIcon,
  MoreIcon,
  GalleryIcon,
} from '../../SubComponents/Buttons/index';
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
          source: {uri: item.uri},
          height: item.height,
          width: item.width,
          fav_status: item.fav_status,
          caption: item.caption,
          captionStyle: item.captionStyle,
        };
        temp = [...temp, newItem];
        // item.dimension={{item.height,item.width}}
      });
      this.setState({photoArray: temp});
      console.log('did update');
    }
    if (prevProps.photoArray[0] == this.props.photoArray[1]) {
      console.log('ADDED TO CYKEE GALLERY');
      ToastAndroid.show('Added to Cykee Gallery !', ToastAndroid.SHORT);
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
    console.log('UNMOUNT');
    this.props.photo_loaded();
  }
  componentDidMount() {
    console.log('did mount');
    let temp = [];
    this.state.toBeDisplayed.map(item => {
      let newItem = {
        source: {uri: item.uri},
        height: item.height,
        width: item.width,
        fav_status: item.fav_status,
        caption: item.caption,
        captionStyle: item.captionStyle,
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
      url: item.source.uri,
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
    this.props.favPhoto(this.props.photoArray, item.source.uri);
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
              CameraRoll.deletePhotos([
                this.state.photoArray[index].source.uri,
              ]).then(() => {
                // this.props.navigation.push('GalleryScreen', {
                //   index: this.state.index ? this.state.index - 1 : 0,
                //   toBeDisplayed: newToBeDisplayed,
                // });
                this.props.navigation.goBack();
              });
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
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    // let ImageRatio = 3;
    // if (this.state.photoArray[0]) {
    //   ImageRatio =
    //     this.state.photoArray[this.state.index].height /
    //     this.state.photoArray[this.state.index].width;
    // } else ImageRatio = 1;
    // console.log(ImageRatio);
    // console.log('h', HEIGHT);
    // console.log('w', WIDTH);
    // console.log('ratio', SCREEN_RATIO);
    // if (ImageRatio == SCREEN_RATIO)
    //   console.log('TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE');

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
          // <GallerySwiper
          //   style={{
          //     // flex: 1,
          //     height: '100%',
          //     width: '100%',
          //     backgroundColor: this.state.optionsAvailable ? 'black' : 'black',
          //   }}
          //   // resizeMode={ImageRatio >= 2 ? 'stretch' : 'contain'}
          //   resizeMode={
          //     this.state.photoArray[this.state.index].height /
          //       this.state.photoArray[this.state.index].width >=
          //     SCREEN_RATIO
          //       ? 'stretch'
          //       : 'contain'
          //   }
          //   // resizeMode={'contain'}
          //   images={this.state.photoArray}
          //   initialPage={this.state.index}
          //   flatListProps={{
          //     initialNumToRender: this.state.index,
          //     initialScrollIndex: this.state.index,
          //     getItemLayout: (data, index) => ({
          //       length: Dimensions.get('screen').width,
          //       offset: Dimensions.get('screen').width * index,
          //       index,
          //     }),
          //   }}
          //   initialNumToRender={4}
          //   // sensitiveScroll={false}
          //   // resistantStrHorizontal={500}
          //   // resistantStrVertical={500}
          //   onSingleTapConfirmed={() =>
          //     this.setState({
          //       optionsAvailable: !this.state.optionsAvailable,
          //     })
          //   }
          //   onPageSelected={index => this.setState({index: index})}
          //   // pageMargin={5}
          //   onSwipeUpReleased={() =>
          //     this.onPressShare(this.state.photoArray[this.state.index])
          //   }
          //   onSwipeDownReleased={() => this.props.navigation.navigate('Home')}
          // />
          <View
            style={{
              // flex: 1,
              height: '100%',
              width: '100%',
              psition: 'absolute',
              bottom: 0,
              backgroundColor: this.state.optionsAvailable ? 'black' : 'black',
            }}>
            <Gallery
              ImageResizeMode={
                this.state.photoArray[this.state.index].height /
                  this.state.photoArray[this.state.index].width >
                SCREEN_RATIO
                  ? 'stretch'
                  : 'contain'
              }
              errorComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      resizeMode: 'center',
                    }}
                    source={require('../../Images/no-image.png')}
                  />
                </View>
              )}
              images={this.state.photoArray}
              initialPage={this.state.index}
              flatListProps={{
                initialNumToRender: this.state.index,
                initialScrollIndex: this.state.index,
                getItemLayout: (data, index) => ({
                  length: Dimensions.get('screen').width,
                  offset: Dimensions.get('screen').width * index,
                  index,
                }),
              }}
              onSingleTapConfirmed={() =>
                this.setState({
                  optionsAvailable: !this.state.optionsAvailable,
                })
              }
              onPageSelected={index => this.setState({index: index})}
            />
          </View>
        )}

        <View style={[styles.bottomContainer]}>
          <TouchableOpacity
            onPress={() => this.setState({showCapion: !this.state.showCapion})}
            style={{
              // paddingTop: 10,
              borderWidth: 0.01,
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
                    ? this.state.photoArray[this.state.index].caption
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
          <SafeAreaView style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
                console.log('Back Pressed');
              }}>
              <Icon
                type="ionicon"
                name="md-arrow-back"
                size={GlobalIconSize}
                color={'silver'}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.onPressGallery()}
              style={[styles.IconContainer, {flex: 0}]}>
              <GalleryIcon />
            </TouchableOpacity> */}
          </SafeAreaView>
        )}
      </View>
    );
  }
}

export default GalleryScreen;
