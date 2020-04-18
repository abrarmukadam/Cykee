import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';
import FastImage from 'react-native-fast-image';

class GalleryButton extends Component {
  state = {photo: undefined};
  componentDidMount() {}

  render() {
    // CameraRoll.getPhotos({
    //   first: 1,
    //   groupName: 'Cykee',
    // })
    //   .then((r) => {
    //     this.setState({photo: r.edges[0].node.image.uri});
    //   })
    //   .catch((err) => {
    //     console.log('Error loading 1st image for Gallery Icon view');
    //     //Error Loading Images
    //   });
    return (
      <TouchableOpacity
        style={styles.IconContainer}
        onPress={() => this.props.onPressGalleryIcon()}>
        <FastImage
          style={styles.ImageStyle}
          source={{uri: this.props.photo_uri}}
          defaultSource={require('../../Images/no-image.png')}
        />
      </TouchableOpacity>
    );
  }
}

export default GalleryButton;
