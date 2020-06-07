import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from './styles';

import FastImage from 'react-native-fast-image';

class GalleryButton extends Component {
  state = {photo: undefined};
  componentDidMount() {}

  render() {
    return (
      <TouchableOpacity
        style={styles.IconContainer}
        onPress={() => this.props.onPressGalleryIcon()}>
        <Image
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '22deg'}],
              left: 2,
              backgroundColor: this.props.photo_uri3 ? '#0000' : 'white',
            },
          ]}
          source={
            this.props.photo_uri3
              ? {uri: this.props.photo_uri3}
              : require('../../Images/no-image.png')
          }
          defaultSource={require('../../Images/no-image.png')}
        />
        <Image
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '12deg'}],
              left: 2,
              backgroundColor: this.props.photo_uri2 ? '#0000' : 'white',
            },
          ]}
          source={
            this.props.photo_uri2
              ? {uri: this.props.photo_uri2}
              : require('../../Images/no-image.png')
          }
          defaultSource={require('../../Images/no-image.png')}
        />
        <FastImage
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '0deg'}],
              left: 0,
              backgroundColor: this.props.photo_uri1 ? '#0000' : 'white',
            },
          ]}
          // source={{uri: this.props.photo_uri1}}
          source={
            this.props.photo_uri1
              ? {uri: this.props.photo_uri1}
              : require('../../Images/no-image.png')
          }
          defaultSource={require('../../Images/no-image.png')}
        />
      </TouchableOpacity>
    );
  }
}

export default GalleryButton;
