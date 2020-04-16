import React, {Component, useState} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Share from 'react-native-share';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';

import Gallery from 'react-native-image-gallery';

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
  state = {
    optionsAvailable: true,
    photoArray: [],
    images: [],
    index: this.props.route.params.index,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.photoArray != this.props.photoArray) {
      let temp = [];
      this.props.photoArray.map(item => {
        let newItem = {
          source: {uri: item.uri},
          dimension: {height: 50, width: 50},

          // dimension: {height: item.height, width: item.width},
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
  }
  componentDidMount() {
    console.log('did mount');
    let temp = [];
    this.props.photoArray.map(item => {
      let newItem = {
        source: {uri: item.uri},
        dimension: {height: 50, width: 50},
        // dimension: {height: item.height, width: item.width},
        caption: item.caption,
      };
      temp = [...temp, newItem];
    });
    this.setState({photoArray: temp});
    // this.setState({index: this.props.route.params.index});
    // console.log('loading index:', this.props.route.params.index);
    //getting 1st 10 photos in Cykee gallery
    // console.log(this.props.photoArray[0]);
    // CameraRoll.getPhotos({
    //   first: 10,
    //   groupName: 'Cykee',
    // })
    //   .then((r) => {
    //     let temp = [];
    //     r.edges.map((p, i) => {
    //       let findingCaption = this.props.photoArray.find((item) => {
    //         if (item.fileName == p.node.image.filename) return item;
    //       });
    //       p.node.image.caption = findingCaption.caption;
    //       p.node.image.fav_status = findingCaption.fav_status;
    //       return (temp = [...temp, p.node.image]);
    //     });
    //     this.setState({photoArrayObj: r, toBeDisplayed: temp});
    //   })
    //   .catch((err) => {
    //     console.log('Error loading 1st image for Gallery Icon view');
    //     //Error Loading Images
    //   });
  }
  onPressGallery = () => {
    this.props.navigation.navigate('GridViewScreen');
    // this.setState({index: 0});
    console.log('Gallery Pressed');
  };
  onPressShare = item => {
    console.log('Share Pressed');
    const shareOptions = {
      type: 'image',
      url: item.uri,
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
    this.props.favPhoto(this.props.photoArray, item.uri);
  };
  onPressEdit = () => {
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
            CameraRoll.deletePhotos([this.props.photoArray[index].uri]);
            let updatedPhotoArray = [...this.props.photoArray];
            updatedPhotoArray.splice(index, 1);

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
    console.log('render ', HEIGHT);

    return (
      <View style={styles.container}>
        {this.state.photoArray[0] && (
          <Gallery
            images={this.state.photoArray}
            initialPage={this.state.index}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: this.state.optionsAvailable ? 'white' : 'black',
            }}
            onSingleTapConfirmed={() =>
              this.setState({
                optionsAvailable: !this.state.optionsAvailable,
              })
            }
            onPageSelected={index => this.setState({index: index})}
          />
        )}
        {/* <GallerySwiper
          initialPage={this.state.index}
          // initialPage={0}
          style={{
            width: '100%',
            backgroundColor: this.state.optionsAvailable ? 'white' : 'black',
          }}
          // images={this.state.toBeDisplayed}
          images={this.state.photoArray}
          initialNumToRender={this.state.index + 2}
          pageMargin={6}
          // removeClippedSubviews={true}
          sensitiveScroll={true}
          onSingleTapConfirmed={() =>
            this.setState({optionsAvailable: !this.state.optionsAvailable})
          }
          onPageSelected={(index) => this.setState({index: index})}
          onDoubleTapConfirmed={() => console.log('2')}
          onLongPress={(i, j) => console.log(i, j)}
          onSwipeDownReleased={() => this.props.navigation.navigate('Home')}
          // onEndReachedThreshold={0.8}
          // onEndReached={() => {
          //   // if (this.state.photoArrayObj.page_info)
          //   //   console.log(
          //   //     'this.state.photoArrayObj.page_info.end_cursor',
          //   //     this.state.photoArrayObj,
          //   //   );
          //   if (this.state.photoArrayObj.page_info) {
          //     // if (
          //     //   this.state.index ==
          //     //   this.state.photoArrayObj.page_info.end_cursor - 4
          //     // )
          //     console.log(
          //       'load photo called-',
          //       this.state.photoArrayObj.page_info.end_cursor,
          //     );
          //     CameraRoll.getPhotos({
          //       first: 10,
          //       after: this.state.photoArrayObj.page_info.end_cursor,
          //       groupName: 'Cykee',
          //     })
          //       .then((r) => {
          //         let temp = [];
          //         let findingCaption = {};
          //         console.log('r.edges[0]', r.edges[0]);
          //         r.edges.map((p, i) => {
          //           findingCaption = this.props.photoArray.find((item) => {
          //             if (item.fileName == p.node.image.filename) return item;
          //           });
          //           p.node.image.caption = findingCaption.caption;

          //           return (temp = [...temp, p.node.image]);
          //         });
          //         console.log(temp);
          //         this.setState({
          //           photoArrayObj: r,
          //           toBeDisplayed: [...this.state.toBeDisplayed, ...temp],
          //         });
          //       })
          //       .catch((err) => {
          //         console.log('Error loading 1st image for Gallery Icon view');
          //         //Error Loading Images
          //       });
          //   }

          //   console.log('end Reached');
          //   //     // add more images when scroll reaches end
          // }}
        /> */}
        {this.state.optionsAvailable && (
          <SafeAreaView style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigationgoBack()
                this.props.navigation.navigate('GridViewScreen');
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
        {this.state.optionsAvailable && (
          <SafeAreaView style={styles.bottomContainer}>
            <CaptionComponent
              caption={
                this.props.photoArray[this.state.index]
                  ? this.props.photoArray[this.state.index].caption
                  : ''
              }
            />
            <SafeAreaView style={styles.bottomSubContainer}>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() =>
                  this.onPressShare(this.props.photoArray[this.state.index])
                }>
                <ShareIcon />
                <Text style={styles.IconTextStyle}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => {
                  this.onPressFav(this.props.photoArray[this.state.index]);

                  // let temp = [...this.props.photoArray];
                  // temp[this.state.index].fav_status = !temp[this.state.index]
                  //   .fav_status;
                  // this.setState({toBeDisplayed: temp});
                }}>
                <FavouriteIcon
                  fav_status={
                    this.props.photoArray[this.state.index]
                      ? this.props.photoArray[this.state.index].fav_status
                      : false
                  }
                />
                <Text style={styles.IconTextStyle}>Favorite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.onPressEdit()}>
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
          </SafeAreaView>
        )}
      </View>
    );
  }
}

export default GalleryScreen;
