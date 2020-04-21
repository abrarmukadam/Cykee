import React, {PureComponent} from 'react';
import PhotoGrid from 'react-native-photo-grid';
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {BackButton, FavouriteIcon} from './../../SubComponents/Buttons/index';
import FastImage from 'react-native-fast-image';
import {SearchBar, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  GlobalIconColor,
  GlobalIconSize,
  GlobalMediumIconSize,
  GlobalLargeIconSize,
} from '../../SubComponents/Buttons/index';

class GridViewComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchFilter: '',
      filteredList: [],
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.receivedArray,
      selectedIndex: 0,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('GridView did update called');

    let filteredList = [];
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.receivedArray != this.props.receivedArray ||
      prevState.selectedIndex != this.state.selectedIndex
    ) {
      // console.log(this.state.selectedIndex)

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

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
    console.log('selected index:', selectedIndex);
  };
  render() {
    console.log(this.state.searchFilter);
    const {selectedIndex} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
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
    return (
      <View
        style={[styles.cardStyle, {activeOpacity: 0, marginRight: 2}]}
        key={this.props.receivedArray.indexOf(item)}>
        <StatusBar hidden={false} />

        <TouchableOpacity
          key={item.id}
          style={{flex: 1, activeOpacity: 0}}
          // style={{width: '24%', height: 200}}
          onPress={() => {
            let index = this.props.receivedArray.indexOf(item);
            // Do Something
            this.props.onPressCard(index);
            // this.props.navigation.push('GalleryScreen', {index: index});

            console.log('index:', index);
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{flex: 1, borderRadius: 5}}
            source={{uri: item.uri}}
          />
        </TouchableOpacity>

        {item.caption != '' && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionStyle}>{item.caption}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favContainer}
          onPress={() => {
            console.log('Photo Fav pressed');
            this.props.favPhoto(this.props.receivedArray, item.uri);
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

export default GridViewComponent;
