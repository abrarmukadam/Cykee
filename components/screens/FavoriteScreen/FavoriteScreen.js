import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GridViewComponent} from '../../SubComponents/Buttons/index';

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

  onPressCard = index => {
    this.props.navigation.push('GalleryScreen', {
      index: index,
    });
  };

  render() {
    return (
      <GridViewComponent
        receivedArray={this.state.toBeDisplayed}
        onPressCard={this.onPressCard}
      />
    );
  }
}
export default FavoriteScreen;
