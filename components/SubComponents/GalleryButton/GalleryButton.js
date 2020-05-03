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
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '20deg'}],
              left: 0,
            },
          ]}
          source={{uri: this.props.photo_uri3}}
          defaultSource={require('../../Images/no-image.png')}
        />
        <FastImage
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '10deg'}],
              left: 0,
            },
          ]}
          source={{uri: this.props.photo_uri2}}
          defaultSource={require('../../Images/no-image.png')}
        />
        <FastImage
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '0deg'}],
              left: 2,
            },
          ]}
          source={{uri: this.props.photo_uri1}}
          defaultSource={require('../../Images/no-image.png')}
        />
      </TouchableOpacity>
    );
  }
}

export default GalleryButton;
