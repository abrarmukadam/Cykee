import React, {Component} from 'react';
import PhotoGrid from 'react-native-photo-grid';
import {
  ScrollView,
  RefreshControl,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import styles from './styles';
import {
  BackButton,
  FavouriteIcon,
  SelectionIcon,
  ShareIcon,
  DeleteIcon,
  CykeeColor,
  MoreIcon,
  EditScreenButton,
  GRID_CAPTION_SIZE,
  CAPTION_FONT,
  TEXT_BUTTON_COLOR,
  BACKGROUND_COLOR,
  TAB_BAR_COLOR,
  TagIcon,
  TagDisplayComponent,
  SearchedTagsComponent,
  PlayOverlay,
  backgroundColorArray,
} from './../../SubComponents/Buttons/index';
import FastImage from 'react-native-fast-image';
// import Icon from 'react-native-vector-icons/Ionicons';
const BLANK_CAPTION = 'blankCaption';
import {Button, Icon, Header} from 'react-native-elements';

import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';
import GestureRecognizer from 'react-native-swipe-gestures';
import {default as HideCaption} from '../HideCaption/HideCaption';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {
  GlobalIconColor,
  GlobalIconSize,
  GlobalMediumIconSize,
  GlobalLargeIconSize,
  SearchPhotoComponent,
  EmptyGalleryMessage,
} from '../../SubComponents/Buttons/index';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
const {width: WIDTH_W, height: HEIGHT_W} = Dimensions.get('window');

class GridViewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilter: '',
      filteredList: [],
      longPressStatus: false,
      selectedArray: 0,
      refreshing: false,
      selectedArrayLength: 0,
    };
  }
  async componentDidMount() {
    this.props.photo_loaded();
    console.log('componentDidMount in GridViewComponnet');
    this.setState({
      filteredList: this.props.receivedArray,
      refreshing: false,
    });
    changeNavigationBarColor(TAB_BAR_COLOR);
  }
  componentWillUnmount() {
    console.log('UNMOUNTED');
    changeNavigationBarColor('transparent');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('grid vview did update');
    let filteredList = [];
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.receivedArray != this.props.receivedArray ||
      prevProps.photoArray != this.props.photoArray
    ) {
      if (this.props.gridSize == 'CameraRoll') {
        this.setState({
          selectedArray: 0,
          selectedArrayLength: 0,
          longPressStatus: false,
        });
      }
      console.log('updating data');
      filteredList = this.props.receivedArray.filter(List => {
        let newString = '';
        if (List.tagsArray)
          newString = List.caption + ' ' + List.tagsArray.toString();
        else newString = List.caption;
        return (
          newString
            .toLowerCase()
            .indexOf(this.state.searchFilter.toLowerCase()) !== -1
        );
      });

      this.setState({
        filteredList: filteredList,
      });
    }
  }
  onPressShare = () => {
    console.log('Share Pressed');
    let items = [];
    this.state.filteredList.map(item => {
      if (item.selectedStatus) items = [...items, item.uri];
      // {uri: item.uri, caption: item.caption}];
    });
    const shareOptions = {
      type: 'image',
      urls: [...items],
      message: items[0].caption,
      subject: items[0].caption,
      title: items[0].caption,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  onPressDelete = () => {
    console.log('Delete Pressed');
    console.log(this.state.selectedArray);
    const deletHeader = 'Delete Photo ?';
    const deletMessage = 'This photo will be deleted from the album.';
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
          text: 'Delete',
          onPress: () => {
            let deleteItems = [];
            this.state.selectedArray.map(item => {
              deleteItems = [...deleteItems, item.uri];
            });
            CameraRoll.deletePhotos(deleteItems);
            if (this.props.gridSize != 'CameraRoll') {
              let updatedPhotoArray = [...this.props.photoArray];

              this.state.selectedArray.map(item => {
                let deleteIndex = updatedPhotoArray.indexOf(
                  item, //item to be deleted should match the item in photoArray Props
                );
                updatedPhotoArray.splice(deleteIndex, 1);
              });

              console.log('updatedPhotoArray:', updatedPhotoArray);
              this.props.deletePhotoFromList(updatedPhotoArray);
            }
            this.setState({longPressStatus: false});
            console.log('photo deleted');
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    // return <View />;
    if (!this.state.filteredList.length & (this.props.gridSize != 'CameraRoll'))
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={'transparent'} translucent />
          <View>
            {this.props.gridSize != 'CameraRoll' && (
              <SearchPhotoComponent
                searchFilter={this.state.searchFilter}
                onChangeSearchFilter={searchFilter =>
                  this.setState({searchFilter})
                }
                //
              />
            )}
          </View>
          <EmptyGalleryMessage />
        </View>
      );

    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true} /> */}
        <StatusBar backgroundColor={'transparent'} translucent />
        <View>
          {this.props.gridSize != 'CameraRoll' && (
            <SearchPhotoComponent
              searchFilter={this.state.searchFilter}
              onChangeSearchFilter={searchFilter =>
                this.setState({searchFilter})
              }
              //
            />
          )}
          {this.state.searchFilter[0] == '#' && (
            <SearchedTagsComponent
              searchFilter={this.state.searchFilter}
              filteredList={this.state.filteredList}
              changeSearchFilter={item => this.setState({searchFilter: item})}
            />
          )}
        </View>
        {this.state.longPressStatus && (
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>
              {this.state.selectedArrayLength} Item selected
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({longPressStatus: false})}
              style={{
                flex: 0,
                position: 'absolute',
                right: 0,
                // alignSelf: 'flex-end',
                // width: 100,
              }}>
              <Button
                onPress={() => this.setState({longPressStatus: false})}
                title="Cancel"
                type="clear"
                titleStyle={{color: TEXT_BUTTON_COLOR}}
                buttonStyle={{
                  width: 100,
                  height: 40,
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.gridContainer}>
          {this.state.filteredList && (
            <PhotoGrid
              data={this.state.filteredList}
              itemsPerRow={3}
              itemMargin={0}
              itemPaddingHorizontal={1}
              renderHeader={this.renderHeader}
              renderItem={this.renderItem}
              onEndReached={this.props._handleLoadMore} //optional
              refreshControl={
                <RefreshControl
                  colors={[CykeeColor]}
                  onRefresh={() => {
                    this.setState({refreshing: true});
                    if (this.props.reloadPhotos) {
                      console.log('runn');
                      this.props.reloadPhotos();
                    }
                    this.setState({
                      refreshing: false,
                    });
                  }}
                  refreshing={this.state.refreshing}
                />
              }
            />
          )}
        </View>
        {this.state.longPressStatus && (
          <View style={styles.buttonContainerStyle}>
            <View style={{position: 'absolute', bottom: 60, right: 20}}>
              <EditScreenButton
                iconType="simple-line-icon"
                iconName="share"
                iconOpacity={0.8}
                // topPosition={20}
                handleOnPress={() => this.onPressShare()}
              />
            </View>
            <View style={{position: 'absolute', bottom: 0, right: 20}}>
              <EditScreenButton
                iconType="evilicon"
                iconName="trash"
                iconOpacity={0.8}
                // topPosition={80}
                handleOnPress={() => this.onPressDelete()}
              />
            </View>
          </View>
        )}
        {/* </ScrollView> */}
        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.backGroundBackButtonStyle}
          onPress={this.props.EmptyScreenBackButton}
        />
        {/* {this.renderAnimation(this.state.filteredList[this.state.index])} */}
      </View>
    );
  }
  renderHeader = () => {
    return <View />;
  };
  longPressItem = index => {
    let filteredList = [...this.state.filteredList];
    filteredList.map(item => {
      item.selectedStatus = false;
    });
    filteredList[index].selectedStatus = true;

    this.setState({
      longPressStatus: true,
      filteredList: filteredList,
      selectedArray: [filteredList[index]],
      selectedArrayLength: 1,
    });
  };
  animationComplete = () => {
    this.setState({animationCalled: false});
  };
  renderAnimation = item => {
    console.log('renderAnimation called');
    if (this.state.animationCalled)
      return (
        <ImageAnimation
          item={item}
          animationComplete={this.animationComplete}
          touchLocation={this.state.touchLocation}
        />
      );
    else return <View />;
  };

  singlePressItem = index => {
    if (this.state.longPressStatus == false) {
      // console.log('EVT EVT EVT: ', touchLocation);
      this.props.photo_selected();
      this.setState({
        index: index,
        // animationCalled: true,
      });

      console.log('card Pressed:', this.state.filteredList[index].uri);
      this.props.onPressCard(index, this.state.filteredList);
    } else if (this.state.longPressStatus == true) {
      let tempList = [...this.state.filteredList];
      tempList[index].selectedStatus = !tempList[index].selectedStatus;
      let count = 0;
      let tempSelectedArray = [];
      tempList.map(item => {
        if (item.selectedStatus == true) {
          count = count + 1;
          tempSelectedArray = [...tempSelectedArray, item];
        }
      });

      this.setState({
        filteredList: tempList,
        // selectedArray: [...this.state.selectedArray, tempList[]],
        selectedArray: tempSelectedArray,
        selectedArrayLength: count,
      });
      if (count == 0) this.setState({longPressStatus: false});
    }
  };

  renderItem = (item, itemSize) => {
    let index = this.state.filteredList.indexOf(item);
    return (
      <TouchableOpacity
        style={[
          styles.cardStyle,
          {
            marginRight: 2,
            height: this.props.gridSize == 'CameraRoll' ? 100 : 200,
          },
        ]}
        activeOpacity={0.7}
        key={this.state.filteredList.indexOf(item)}
        disabled={this.props.galleryReducer.status.isLoading}
        onPress={evt => {
          let touchLocation = {
            locationX: evt.nativeEvent.pageX - evt.nativeEvent.locationX,
            locationY:
              HEIGHT -
              HEIGHT_W +
              evt.nativeEvent.pageY -
              evt.nativeEvent.locationY -
              100 -
              48,
            // locationX: evt.nativeEvent.pageX - WIDTH / 3,
            // locationY: evt.nativeEvent.pageY - 400,
          };
          this.setState({touchLocation});
          this.singlePressItem(index);
        }}
        onLongPress={() => {
          this.longPressItem(index);
          console.log('longPress accepted');
        }}>
        {item.type == BLANK_CAPTION && (
          <View
            style={[
              styles.Layout,
              {
                backgroundColor: backgroundColorArray[item.backColor],
                height: '100%',
                width: '100%',
                activeOpacity: 0,
                borderRadius: 5,
                // borderWidth: 1,
                // borderColor: 'red',
                marginLeft: 0,
                marginTop: 0,
              },
            ]}>
            <Text
              style={[
                styles.AffText,
                {fontFamily: CAPTION_FONT[item.captionStyle.captionFont]},
              ]}>
              {`${item.caption} `}
            </Text>
          </View>
        )}

        {item.type != BLANK_CAPTION && (
          <View>
            <View
              style={{
                height: '100%',
                width: '100%',
                activeOpacity: 0,
              }}>
              {Platform.OS == 'android' && (
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 5,
                    resizeMode: 'cover',
                  }}
                  source={{uri: item.uri}}
                />
              )}
              {Platform.OS != 'android' && (
                <Image
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 5,
                    resizeMode: 'cover',
                  }}
                  source={{uri: item.uri}}
                />
              )}
            </View>
            {item.caption != '' && this.props.hideCaption == false && (
              <View style={styles.captionContainer}>
                <Text
                  style={[
                    styles.captionStyle,
                    {
                      fontSize: item.captionStyle
                        ? GRID_CAPTION_SIZE[item.captionStyle.captionSize]
                        : 20,
                      fontFamily: item.captionStyle
                        ? CAPTION_FONT[item.captionStyle.captionFont]
                        : 'normal',
                    },
                  ]}>
                  {item.caption}
                </Text>
              </View>
            )}
          </View>
        )}
        {this.state.longPressStatus && (
          <TouchableOpacity
            style={styles.selectionIconContainer}
            onPress={() => this.singlePressItem(index)}>
            <SelectionIcon
              iconSize={20}
              iconColor="white"
              longPressStatus={this.state.longPressStatus}
              selectedStatus={this.state.filteredList[index].selectedStatus}
            />
          </TouchableOpacity>
        )}
        {this.state.showTags && (
          <TouchableOpacity
            style={styles.tagsContainer}
            onPress={() => this.setState({showTags: !this.state.showTags})}>
            <TagDisplayComponent
              tagsArray={item.tagsArray ? item.tagsArray : ['']}
            />
          </TouchableOpacity>
        )}

        {this.props.gridSize != 'CameraRoll' &&
          this.state.longPressStatus == false && (
            <View style={styles.favContainer}>
              <TouchableOpacity
                style={{paddingHorizontal: 4}}
                onPress={() => {
                  console.log('Photo fav pressed', item.fileName);
                  this.props.favPhoto(this.props.photoArray, item.fileName);
                }}>
                <FavouriteIcon
                  iconSize={20}
                  iconColor={BACKGROUND_COLOR}
                  fav_status={item.fav_status}
                />
              </TouchableOpacity>
              {item.tagsArray && (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({showTags: !this.state.showTags})
                  }>
                  {/* {!this.state.showTags && !item.tagsArray[0] == false && ( */}
                  {!item.tagsArray[0] == false && (
                    <TagIcon
                      tagIconStatus={!this.state.showTags}
                      iconSize={20}
                      iconColor={BACKGROUND_COLOR}
                      // fav_status={item.fav_status}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
        {item.type == 'video' && (
          <Icon
            type="material-community"
            name="play-circle-outline"
            size={20}
            color={CykeeColor}
            containerStyle={{
              // opacity: 0.5,
              position: 'absolute',
              bottom: 5,
              right: 5,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };
}

export default GridViewComponent;

class ImageAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openProgress: new Animated.Value(0),
      // yPosition: new Animated.Value(200),
      // xPosition: new Animated.Value(200),
      // opacity: new Animated.Value(0),
      // left: new Animated.Value(this.props.touchLocation.locationX),
      // top: new Animated.Value(this.props.touchLocation.locationY),
    };
  }
  componentDidMount() {
    // this.state.openProgress.setValue(0);
    Animated.timing(this.state.openProgress, {
      toValue: 1,
      duration: 10,
      useNativeDriver: true,
    }).start(() => this.props.animationComplete());
    // this.setState({
    // });
    // this.setState({
    //   left: new Animated.Value(this.props.touchLocation.locationX),
    //   top: new Animated.Value(this.props.touchLocation.locationY),
    // });
    // const durationTime = 2000;
    // Animated.parallel([
    //   Animated.timing(this.state.yPosition, {
    //     toValue: HEIGHT,
    //     duration: durationTime,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(this.state.xPosition, {
    //     toValue: WIDTH,
    //     duration: durationTime,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(this.state.left, {
    //     toValue: 0,
    //     duration: durationTime,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(this.state.top, {
    //     toValue: 0,
    //     duration: durationTime,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(this.state.opacity, {
    //     toValue: 0,
    //     duration: durationTime,
    //     useNativeDriver: true,
    //   }),
    // ]).start(() => this.props.animationComplete());
  }
  render() {
    console.log('IMAGE ANIMATION RENDERED');
    const sourceAspectRatio = WIDTH / 3 / HEIGHT;
    const destAspectRatio = this.props.item.width / this.props.item.height;
    const newHeight = this.props.item.width / sourceAspectRatio;
    // const newWidth = this.props.item.width;

    let destPosY =
      // this.props.touchLocation.locationY -
      (newHeight - this.props.item.height) / 2;
    // let destPosX =
    //   this.props.touchLocation.locationX -
    //   (newWidth - this.props.item.width) / 2;

    const openingInitScale = WIDTH / 3 / WIDTH;
    // const translateInitX =
    //   this.props.touchLocation.locationX + this.props.item.width / 2;
    const translateInitY =
      this.props.touchLocation.locationY + this.props.item.height / 2;

    // const translateDestX = destPosX + this.props.item.width / 2;
    const translateDestY = destPosY + this.props.item.height / 2;

    const openingInitTranslateX =
      this.props.touchLocation.locationX - WIDTH_W / 3;
    const openingInitTranslateY = this.props.touchLocation.locationY - 200;
    //translateInitY - translateDestY;
    let consoleItem = {
      // aspectRatio,
      newHeight,
      // destPosX,
      destPosY,
      openingInitScale,
      // translateInitX,
      translateInitY,
      // translateDestX,
      translateDestY,
      // openingInitTranslateX,
      openingInitTranslateY,
    };

    let animationStyle = {
      height: this.state.yPosition,
      width: this.state.xPosition,
      left: this.state.left,
      top: this.state.top,
    };
    this.AnimatedValue = this.state.openProgress;
    let animationStyleInterpolate = {
      transform: [
        {
          translateY: this.AnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [openingInitTranslateY, 0],
          }),
        },
        {
          translateX: this.AnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [openingInitTranslateX, 0],
          }),
        },
        {
          scale: this.AnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [openingInitScale, 1],
          }),
        },
      ],
    };
    return (
      <Animated.Image
        style={[
          {
            position: 'absolute',
            // justifyContent: 'center',
            // alignItems: 'center',
            // resizeMode: 'contain',
            height: HEIGHT,
            width: WIDTH,
            left: 0,
            top: 0,
          },
          // animationStyle,
          animationStyleInterpolate,
        ]}
        source={{uri: this.props.item.uri}}
      />
    );
  }
}
