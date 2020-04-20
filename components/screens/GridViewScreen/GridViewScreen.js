import React, {PureComponent} from 'react';
import PhotoGrid from 'react-native-photo-grid';
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';
import {BackButton, FavouriteIcon} from './../../SubComponents/Buttons/index';
import FastImage from 'react-native-fast-image';
import {SearchBar, ButtonGroup} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

class GridViewScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchFilter: '',
      filteredList: [],
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.photoArray,
      selectedIndex: 0,
    });
  }
  componentWillUnmount() {
    // remove event listener
    console.log('GridViewScreen unmount');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('GridView did update called');

    let filteredList = [];
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.photoArray != this.props.photoArray ||
      (prevState.selectedIndex != this.state.selectedIndex &&
        this.state.selectedIndex == 0)
    ) {
      filteredList = this.props.photoArray.filter(List => {
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
    if (prevState.selectedIndex != this.state.selectedIndex) {
      if (this.state.selectedIndex == 1) {
        filteredList = this.props.photoArray.filter(List => {
          return List.fav_status == true;
        });
        this.setState({
          filteredList: filteredList,
        });
      }
    }
  }
  onPressGallery = () => {
    this.props.navigation.navigate('GridViewScreen');
    // this.setState({index: 0});
    console.log('Gallery Pressed');
  };
  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
    console.log('selected index:', selectedIndex);
  };
  render() {
    const {navigation} = this.props;

    // console.log(this.state.text);
    const buttons = ['All', 'Favorites'];
    const {selectedIndex} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.searchContainer}>
            <SearchBar
              containerStyle={{backgroundColor: 'silver'}}
              inputContainerStyle={styles.searchContainer}
              inputStyle={styles.searchStyle}
              placeholder="Search Photo..."
              onChangeText={text => this.setState({searchFilter: text})}
              value={this.state.searchFilter}
              style={styles.searchStyle}
              round={true}
            />
            {/* <TextInput
              style={styles.searchStyle}
              placeholder={'Search Photo...'}
              placeholderTextColor={'silver'}
              onChangeText={text => this.setState({searchFilter: text})}
            /> */}
          </View>

          <View style={styles.gridContainer}>
            {this.state.filteredList && (
              <PhotoGrid
                data={this.state.filteredList}
                itemsPerRow={3}
                itemMargin={0}
                renderHeader={this.renderHeader}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </ScrollView>
        <ButtonGroup
          containerStyle={styles.buttonContainerStyle}
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
      </View>
    );
  }

  renderHeader() {
    return <View />;
  }

  renderItem = (item, itemSize) => {
    // console.log(item.fav_status);
    return (
      <View style={[styles.cardStyle, {activeOpacity: 0}]}>
        <TouchableOpacity
          key={item.id}
          style={{flex: 1, activeOpacity: 0}}
          // style={{width: '24%', height: 200}}
          onPress={() => {
            let index = this.props.photoArray.indexOf(item);
            // Do Something
            this.props.navigation.navigate('GalleryScreen', {index: index});

            console.log('index:', index);
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{flex: 1, borderRadius: 5}}
            source={{uri: item.uri}}
          />
        </TouchableOpacity>
        <View style={styles.captionContainer}>
          <Text style={styles.captionStyle}>{item.caption}</Text>
        </View>
        <TouchableOpacity
          style={styles.favContainer}
          onPress={() => {
            console.log('Photo Fav pressed');
            this.props.favPhoto(this.props.photoArray, item.uri);
          }}>
          <FavouriteIcon
            iconSize={20}
            iconColor="white"
            fav_status={item.fav_status}
          />
        </TouchableOpacity>
      </View>
    );
  };
}

export default GridViewScreen;
