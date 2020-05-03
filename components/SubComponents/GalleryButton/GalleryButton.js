import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
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
        <FastImage
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '22deg'}],
              left: 2,
            },
          ]}
          source={{uri: this.props.photo_uri3}}
          defaultSource={require('../../Images/no-image.png')}
        />
        <FastImage
          style={[
            styles.ImageStyle,
            {
              transform: [{rotate: '12deg'}],
              left: 2,
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
              left: 0,
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
