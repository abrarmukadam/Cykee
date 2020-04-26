import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import {GridViewComponent} from '../../SubComponents/Buttons/index';
import {default as GridViewComponent} from '../../SubComponents/GridViewComponent/GridViewComponent.container';

class FavoriteScreen extends Component {
  state = {
    toBeDisplayed: [],
  };
  componentDidMount() {
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
      const filteredList = this.props.photoArray.filter(List => {
        return List.fav_status == true;
      });
      this.setState({toBeDisplayed: filteredList});
    }
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

  render() {
    return (
      <GridViewComponent
        receivedArray={this.state.toBeDisplayed}
        onPressCard={this.onPressCard}
        gridSize={'Favorite'}
        onScrollDown={this.onScrollDown}
      />
    );
  }
}
export default FavoriteScreen;
