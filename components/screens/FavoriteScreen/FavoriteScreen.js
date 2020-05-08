import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import {GridViewComponent} from '../../SubComponents/Buttons/index';
import {default as GridViewComponent} from '../../SubComponents/GridViewComponent/GridViewComponent.container';

class FavoriteScreen extends Component {
  state = {
    toBeDisplayed: [],
  };
  componentDidMount() {
    this.props.screen_mounted('FavoriteScreen');

    this.screenLoadListener = this.props.navigation.addListener(
      'tabPress',
      e => {
        this.props.screen_mounted('FavoriteScreen');
      },
    );
    const filteredList = this.props.photoArray.filter(List => {
      return List.fav_status == true;
    });
    this.setState({toBeDisplayed: filteredList});
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchFilter != this.state.searchFilter ||
      prevProps.photoArray != this.props.photoArray
    ) {
      this.props.screen_mounted('FavoriteScreen');

      const filteredList = this.props.photoArray.filter(List => {
        return List.fav_status == true;
      });
      this.setState({toBeDisplayed: filteredList});
    }
  }
  componenDidUnmount() {
    console.log('un-mount');
    this.props.screen_mounted('');

    this.screenLoadListener.remove();
  }

  onPressCard = (index, photoArray) => {
    this.props.navigation.push('GalleryScreen', {
      index: index,
      toBeDisplayed: photoArray,
    });
  };
  onScrollDown = () => {
    this.props.navigation.navigate('Home');
  };
  _handleLoadMore = () => {
    console.log('end reached');
  };

  render() {
    return (
      <GridViewComponent
        receivedArray={this.state.toBeDisplayed}
        onPressCard={this.onPressCard}
        gridSize={'Favorite'}
        onScrollDown={this.onScrollDown}
        _handleLoadMore={this._handleLoadMore}
        EmptyScreenBackButton={() => this.props.navigation.navigate('Home')}
      />
    );
  }
}
export default FavoriteScreen;
