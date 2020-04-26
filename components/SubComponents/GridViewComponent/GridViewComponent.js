import React, {PureComponent} from 'react';
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
} from './../../SubComponents/Buttons/index';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';
import GestureRecognizer from 'react-native-swipe-gestures';

import {
  GlobalIconColor,
  GlobalIconSize,
  GlobalMediumIconSize,
  GlobalLargeIconSize,
} from '../../SubComponents/Buttons/index';

class GridViewComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: '',
      filteredList: [],
      longPressStatus: false,
      selectedArray: 0,
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.receivedArray,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('GridView did update called');

    let filteredList = [];
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.receivedArray != this.props.receivedArray ||
      prevProps.photoArray != this.props.photoArray
    ) {
      filteredList = this.props.receivedArray.filter(List => {
        return (
          List.caption
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
            let deleteItems = [];
            this.state.selectedArray.map(item => {
              deleteItems = [...deleteItems, item.uri];
            });
            CameraRoll.deletePhotos(deleteItems);
            let updatedPhotoArray = [...this.props.photoArray];

            this.state.selectedArray.map(item => {
              let deleteIndex = updatedPhotoArray.indexOf(
                item, //item to be deleted should match the item in photoArray Props
              );
              updatedPhotoArray.splice(deleteIndex, 1);
            });

            console.log('updatedPhotoArray:', updatedPhotoArray);
            this.props.deletePhotoFromList(updatedPhotoArray);
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

    return (
      <View style={styles.container}>
        {this.state.longPressStatus && (
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>
              {this.state.selectedArray.length} Item selected
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
                buttonStyle={{width: 100, height: 40}}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* <ScrollView
          refreshControl={
            <RefreshControl
              colors={[CykeeColor]}
              onRefresh={() => this.props.onScrollDown()}
            />
          }
          style={([styles.scrollViewStyle], {alwaysBounceVertical: true})}> */}
        {this.props.gridSize != 'CameraRoll' && (
          <View style={styles.searchContainer}>
            <Icon
              name="ios-search"
              size={GlobalIconSize - 10}
              color={'grey'}
              style={{position: 'absolute', left: 10}}
            />

            <TextInput
              style={styles.searchStyle}
              placeholder={'Search Photo...'}
              value={this.state.searchFilter}
              placeholderTextColor={'silver'}
              onChangeText={text => this.setState({searchFilter: text})}
            />
            {this.state.searchFilter != '' && (
              <TouchableOpacity
                style={{position: 'absolute', right: 30, padding: 4}}
                onPress={() => this.setState({searchFilter: ''})}>
                <Icon name="ios-close" size={GlobalIconSize} color={'grey'} />
              </TouchableOpacity>
            )}
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
            />
          )}
        </View>
        {/* </ScrollView> */}
        {this.state.longPressStatus && (
          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity
              style={styles.shareIconContainer}
              onPress={() => this.onPressShare()}>
              <ShareIcon iconSize={24} />
              <Text style={styles.shareIconText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareIconContainer}
              onPress={() => this.onPressDelete()}>
              <DeleteIcon iconSize={30} />
              <Text style={styles.shareIconText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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
    });
  };

  singlePressItem = index => {
    if (this.state.longPressStatus == false)
      this.props.onPressCard(index, this.state.filteredList);
    else if (this.state.longPressStatus == true) {
      let tempList = [...this.state.filteredList];
      tempList[index].selectedStatus = !tempList[index].selectedStatus;

      this.setState({
        filteredList: tempList,
        selectedArray: [...this.state.selectedArray, tempList[index]],
      });
    }
    // this.props.navigation.push('GalleryScreen', {index: index});
  };

  renderItem = (item, itemSize) => {
    let index = this.state.filteredList.indexOf(item);
    return (
      <View
        style={[
          styles.cardStyle,
          {
            activeOpacity: 0,
            marginRight: 2,
            height: this.props.gridSize == 'CameraRoll' ? 100 : 200,
          },
        ]}
        key={this.state.filteredList.indexOf(item)}>
        <StatusBar hidden={false} />

        <TouchableOpacity
          key={item.id}
          style={{flex: 1, activeOpacity: 0}}
          onPress={() => this.singlePressItem(index)}
          onLongPress={() => {
            this.longPressItem(index);
            console.log('longPress accepted');
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{flex: 1, borderRadius: 5, resizeMode: 'cover'}}
            source={{uri: item.uri}}
          />
        </TouchableOpacity>

        {item.caption != '' && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionStyle}>{item.caption}</Text>
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

        {this.props.gridSize != 'CameraRoll' &&
          this.state.longPressStatus == false && (
            <TouchableOpacity
              style={styles.favContainer}
              onPress={() => {
                console.log('Photo fav pressed');
                this.props.favPhoto(this.props.photoArray, item.uri);
              }}>
              <FavouriteIcon
                iconSize={20}
                iconColor="white"
                fav_status={item.fav_status}
              />
            </TouchableOpacity>
          )}
      </View>
    );
  };
}

export default GridViewComponent;
