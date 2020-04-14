import React, {Component} from 'react';
import PhotoGrid from 'react-native-photo-grid';
import {
  Image,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';
import {BackButton, FavouriteIcon} from './../../SubComponents/Buttons/index';
// import FastImage from 'react-native-fast-image';

class GridViewScreen extends Component {
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
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let filteredList = [];
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.photoArray != this.props.photoArray
    ) {
      filteredList = this.props.photoArray.filter((List) => {
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

  render() {
    // console.log(this.state.text);
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <BackButton
            onPressBack={() => this.props.navigation.navigate('Home')}
          />
          <Text style={styles.headerTextStyle}>Cykee Gallery</Text>
        </View>
        <ScrollView>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchStyle}
              placeholder={'Search Photo...'}
              placeholderTextColor={'silver'}
              onChangeText={(text) => this.setState({searchFilter: text})}
            />
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
            // Do Something
          }}>
          <Image
            resizeMode="cover"
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
