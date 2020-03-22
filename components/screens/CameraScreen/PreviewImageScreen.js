import React, {Component} from 'react';
import {Image, View, TextInput} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';

import {
  GlobalIconColor,
  GlobalIconSize,
} from '../../SubComponents/Buttons/index';

class PreviewImageScreen extends Component {
  constructor(props) {
    super(props);
  }
  // const { photo } = route.params;

  state = {
    // photo: this.props.navigation.getParam('photo'),
    photo: this.props.route.params.photo,
    text: '',
  };
  savePhoto = () => {
    console.log('Photo saved in gallery');

    CameraRoll.save(this.state.photo.uri, {
      type: 'photo',
      album: 'Cykee',
    });
    this.props.navigation.navigate('Home');
  };
  render() {
    // console.log('URI:', this.state.photo.uri);
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.photo.uri}} style={styles.image} />
        <Icon
          name="ios-close"
          size={GlobalIconSize}
          color={GlobalIconColor}
          style={styles.crossButtonStyle}
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder={'Add a caption...'}
            placeholderTextColor="grey"
            value={this.state.text}
            // autoFocus
            onChangeText={text => this.setState({text})}
            autoCapitalize="none"
            padding={10}
          />
          <Icon
            name="md-send"
            size={GlobalIconSize}
            color={GlobalIconColor}
            style={styles.saveButtonStyle}
            onPress={() => this.savePhoto()}
          />
        </View>
      </View>
    );
  }
}

export default PreviewImageScreen;
