import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';

class GalleryButton extends Component {
  state = {photo: ''};
  componentDidMount() {}

  render() {
    CameraRoll.getPhotos({
      first: 1,
      groupName: 'Cykee',
    })
      .then(r => {
        this.setState({photo: r.edges[0].node.image.uri});
      })
      .catch(err => {
        console.log('Error loading 1st image for Gallery Icon view');
        //Error Loading Images
      });
    return (
      <View style={styles.IconContainer}>
        <Image
          style={styles.ImageStyle}
          source={{uri: this.state.photo}}
          defaultSource={require('../../Images/no-image.png')}
        />
      </View>
    );
  }
}

export default GalleryButton;
