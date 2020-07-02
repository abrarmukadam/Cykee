import React, {Component} from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import styles from './styles';

import FastImage from 'react-native-fast-image';

class GalleryButton extends Component {
  state = {photo: undefined};
  componentDidMount() {}

  render() {
    return (
      <TouchableOpacity
        style={styles.IconContainer}
        activeOpacity={0.8}
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
        {this.props.photo3.type == 'blankCaption' && (
          <View
            style={{
              backgroundColor: this.props.photo3.backColor,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignContent: 'center',
              transform: [{rotate: '22deg'}],
              left: 2,
              position: 'absolute',
              borderRadius: 2,
            }}>
            <Text style={{color: 'white', fontSize: 5, textAlign: 'center'}}>
              {this.props.photo3.caption}
            </Text>
          </View>
        )}
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
        {this.props.photo2.type == 'blankCaption' && (
          <View
            style={{
              backgroundColor: this.props.photo2.backColor,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignContent: 'center',
              transform: [{rotate: '12deg'}],
              left: 2,
              position: 'absolute',
              borderRadius: 2,
            }}>
            <Text style={{color: 'white', fontSize: 5, textAlign: 'center'}}>
              {this.props.photo2.caption}
            </Text>
          </View>
        )}
        <Image
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

        {this.props.photo1.type == 'blankCaption' && (
          <View
            style={{
              backgroundColor: this.props.photo1.backColor,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 2,
            }}>
            <Text style={{color: 'white', fontSize: 5, textAlign: 'center'}}>
              {this.props.photo1.caption}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default GalleryButton;
