import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import CameraRoll from '@react-native-community/cameraroll';
import GallerySwiper from 'react-native-gallery-swiper';
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

class GalleryScreen extends Component {
  state = {
    photoArrayObj: [],
    toBeDisplayed: [],
    optionsAvailable: true,
    index: 0,
  };

  componentDidMount() {
    //getting 1st 10 photos in Cykee gallery
    CameraRoll.getPhotos({
      first: 10,
      groupName: 'Cykee',
    })
      .then((r) => {
        let temp = [];
        r.edges.map((p, i) => {
          let findingCaption = this.props.photoArray.find((item) => {
            if (item.fileName == p.node.image.filename) return item;
          });
          p.node.image.caption = findingCaption.caption;
          return (temp = [...temp, p.node.image]);
        });
        this.setState({photoArrayObj: r, toBeDisplayed: temp});
      })
      .catch((err) => {
        console.log('Error loading 1st image for Gallery Icon view');
        //Error Loading Images
      });
  }
  onPressGallery = () => {
    console.log('Gallery Pressed');
  };
  onPressShare = () => {
    console.log('Share Pressed');
  };
  onPressFav = () => {
    console.log('Favorite Pressed');
  };
  onPressEdit = () => {
    console.log('Edit Pressed');
  };
  onPressDelete = (index) => {
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
            CameraRoll.deletePhotos([this.state.toBeDisplayed[index].uri]);
            // this.setState({
            //   // photoArrayObj: [],
            //   toBeDisplayed: [...this.state.toBeDisplayed.splice(index, 1)],
            // });
            console.log('toBeDisplayed:', this.state.toBeDisplayed);
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
    return (
      <View style={styles.container}>
        <GallerySwiper
          initialPage={this.state.index}
          style={{backgroundColor: 'white'}}
          images={this.state.toBeDisplayed}
          initialNumToRender={2}
          sensitiveScroll={true}
          onSingleTapConfirmed={() =>
            this.setState({optionsAvailable: !this.state.optionsAvailable})
          }
          onPageSelected={(index) => this.setState({index: index})}
          onDoubleTapConfirmed={() => console.log('2')}
          onLongPress={(i, j) => console.log(i, j)}
          onSwipeDownReleased={() => this.props.navigation.navigate('Home')}
          onEndReached={() => {
            // if (this.state.photoArrayObj.page_info)
            //   console.log(
            //     'this.state.photoArrayObj.page_info.end_cursor',
            //     this.state.photoArrayObj,
            //   );
            if (this.state.photoArrayObj.page_info)
              if (
                this.state.index ==
                this.state.photoArrayObj.page_info.end_cursor - 2
              )
                CameraRoll.getPhotos({
                  first: 10,
                  after: this.state.photoArrayObj.page_info.end_cursor,
                  groupName: 'Cykee',
                })
                  .then((r) => {
                    let temp = [];
                    // console.log(r.edges[0]);
                    r.edges.map((p, i) => {
                      let findingCaption = this.props.photoArray.find(
                        (item) => {
                          if (item.fileName == p.node.image.filename)
                            return item;
                        },
                      );
                      p.node.image.caption = findingCaption.caption;

                      return (temp = [...temp, p.node.image]);
                    });
                    this.setState({
                      photoArrayObj: r,
                      toBeDisplayed: [...this.state.toBeDisplayed, ...temp],
                    });
                  })
                  .catch((err) => {
                    console.log(
                      'Error loading 1st image for Gallery Icon view',
                    );
                    //Error Loading Images
                  });

            console.log('end Reached');
            //     // add more images when scroll reaches end
          }}
        />
        {this.state.optionsAvailable && (
          <SafeAreaView style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log('Back Pressed');
                this.props.navigation.navigate('Home');
              }}>
              <Icon
                name="md-arrow-back"
                size={GlobalIconSize}
                color={GalleryIconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressGallery()}
              style={styles.IconContainer}>
              <GalleryIcon />
            </TouchableOpacity>
          </SafeAreaView>
        )}
        {this.state.optionsAvailable && (
          <SafeAreaView style={styles.bottomContainer}>
            <CaptionComponent
              caption={
                this.state.toBeDisplayed[this.state.index]
                  ? this.state.toBeDisplayed[this.state.index].caption
                  : ''
              }
            />
            <SafeAreaView style={styles.bottomSubContainer}>
              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.onPressShare()}>
                <ShareIcon />
                <Text style={styles.IconTextStyle}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.IconContainer}
                onPress={() => this.onPressFav()}>
                <FavouriteIcon />
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
