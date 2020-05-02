import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FavoriteScreen from '../FavoriteScreen/FavoriteScreen';

class EmptyScreen extends Component {
  state = {};
  componentDidMount() {
    console.log('EMPTY SCREEN DID MOUNT');
    this.props.navigation.navigate('Home');
  }
  componentDidUpdate() {
    console.log('empty screen did update');
    this.props.navigation.navigate('Home');
  }
  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default EmptyScreen;
