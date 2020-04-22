import React, {Component, useState} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Share from 'react-native-share';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';

import Gallery from 'react-native-image-gallery';
import Carousel from 'react-native-snap-carousel';
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
        };
        temp = [...temp, newItem];
        // item.dimension={{item.height,item.width}}
      });
      this.setState({photoArray: temp});
      console.log('did update');
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
      };
      temp = [...temp, newItem];
    });
    this.setState({photoArray: temp});
    this.props.navigation.setOptions({
      // headerTransparent: true,
      // headerStyle: {
      //   backgroundColor: '#0000',
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
      // headerRight: () => this.rightHeaderButton,
    });
  }
  rightHeaderButton = (
    <TouchableOpacity
      onPress={() => this.onPressGallery()}
      style={[styles.IconContainer, {flex: 0}]}>
      <GalleryIcon iconColor="white" />
    </TouchableOpacity>
  );
  onPressGallery = () => {
    this.props.navigation.navigate('GalleryTab');
    // this.setState({index: 0});
    console.log('Gallery Pressed');
  };
  onPressShare = item => {
    console.log('Share Pressed');
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
    this.props.navigation.navigate('EditScreen', {photo: item});
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
            CameraRoll.deletePhotos([this.state.photoArray[index].source.uri]);
            let updatedPhotoArray = [...this.props.photoArray];
            let deleteIndex = this.props.photoArray.indexOf(
              this.state.toBeDisplayed[index], //item to be deleted should match the item in photoArray Props
            );
            updatedPhotoArray.splice(deleteIndex, 1);

            console.log('updatedPhotoArray:', updatedPhotoArray);
            this.props.deletePhotoFromList(updatedPhotoArray);
            console.log('photo deleted');
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
    let ImageRatio = 1;
    if (this.state.photoArray[0]) {
      ImageRatio =
        this.state.photoArray[this.state.index].height /
        this.state.photoArray[this.state.index].width;
    } else ImageRatio = 1;
    // console.log('height:', this.state.photoArray[this.state.index].height);
    // console.log('width:', this.state.photoArray[this.state.index].width);
    return (
      <View style={styles.container}>
        <StatusBar hidden={!this.state.optionsAvailable} />
        {this.state.photoArray[0] && (
          <Gallery
            style={{
              // flex: 1,
              height: '100%',
              width: '100%',
              backgroundColor: this.state.optionsAvailable ? 'black' : 'black',
            }}
            // ImageResizeMode={'contain'}
            ImageResizeMode={ImageRatio >= 2 ? 'stretch' : 'center'}
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
        )}

        {this.state.optionsAvailable && (
          <SafeAreaView style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
                console.log('Back Pressed');
              }}>
              <Icon
                name="md-arrow-back"
                size={GlobalIconSize}
                color={GalleryIconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressGallery()}
              style={[styles.IconContainer, {flex: 0}]}>
              <GalleryIcon />
            </TouchableOpacity>
          </SafeAreaView>
        )}

        <SafeAreaView style={styles.bottomContainer}>
          <GestureRecognizer
            // onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeUp={() => this.setState({showCapion: true})}
            onSwipeDown={() => this.setState({showCapion: false})}
            config={config}
            style={{
              flex: 1,
              // marginTop: 50,
              // borderColor: 'red',
              // borderWidth: 2,
            }}>
            <View
              style={{
                flex: 1,
                paddingTop: 60,
                borderColor: '#0000',
                borderWidth: 0.01,
              }}>
              {this.state.showCapion && (
                <CaptionComponent
                  caption={
                    this.state.photoArray[this.state.index]
                      ? this.state.photoArray[this.state.index].caption
                      : ''
                  }
                />
              )}
            </View>
          </GestureRecognizer>

          {this.state.optionsAvailable && (
            <SafeAreaView style={styles.bottomSubContainer}>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() =>
                  this.onPressShare(this.state.photoArray[this.state.index])
                }>
                <ShareIcon />
                <Text style={styles.IconTextStyle}>Share</Text>
              </TouchableOpacity>

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
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() =>
                  this.onPressEdit(this.state.photoArray[this.state.index])
                }>
                <EditIcon />
                <Text style={styles.IconTextStyle}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.onPressDelete(this.state.index)}>
                <DeleteIcon />
                <Text style={styles.IconTextStyle}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.onPressMore()}>
                <MoreIcon />
                <Text style={styles.IconTextStyle}>More</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

export default GalleryScreen;
