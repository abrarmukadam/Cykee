import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

import {default as GridViewComponent} from '../../SubComponents/GridViewComponent/GridViewComponent.container';

class CameraRollScreen extends PureComponent {
  state = {toBeDisplayed: []};
  componentDidMount() {
    CameraRoll.getPhotos({
      first: 100,
      Album: 'Camera',
    })
      .then(r => {
        let temp = [];
        r.edges.map((p, i) => {
          p.node.image.source = p.node.image.uri;
          p.node.image.caption = '';
          return (temp = [...temp, p.node.image]);
        });
        this.setState({photoArrayObj: r, toBeDisplayed: temp});
      })
      .catch(err => {
        //Error Loading Images
      });
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
        gridSize={'CameraRoll'}
        onScrollDown={this.onScrollDown}
      />
      // <View style={styles.container}>
      //   <Text style={styles.fontStyle}>
      //     {`This is an empty CameraRollScreen app screen...\n start coding...`}
      //   </Text>
      // </View>
    );
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

export default CameraRollScreen;
