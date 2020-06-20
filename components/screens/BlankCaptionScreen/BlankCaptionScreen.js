import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {
  backgroundColorArray,
  GlobalIconSize,
  CheckCircle,
  BackgroundColor,
} from '../../SubComponents/Buttons/index';

class BlankCaptionScreen extends Component {
  state = {backColor: backgroundColorArray[0]};

  leftHeaderButton = (
    <TouchableOpacity
      onPress={() => this.props.navigation.goBack()}
      // style={{paddingLeft: 20}}
      style={{
        // paddingLeft: 20,
        marginLeft: 20,
      }}
      // style={[styles.IconContainer, {flex: 0}]}
    >
      <View
        style={{
          backgroundColor: 'grey',
          paddingHorizontal: 7,
          borderRadius: 20,
          opacity: 0.2,
        }}>
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 7,
          borderRadius: 20,
          position: 'absolute',
        }}>
        <Icon
          type="ionicon"
          name="md-close"
          size={GlobalIconSize}
          color={'white'}
        />
      </View>
    </TouchableOpacity>
  );

  componentDidMount() {
    changeNavigationBarColor('black');

    this.props.navigation.setOptions({
      headerLeft: () => this.leftHeaderButton,
    });
  }
  onPressSave = () => {
    let newCaption = {
      caption: this.state.text,
      backColor: this.state.backColor,
    };
    //    this.props.handleAddAffirmation(newAffirmation)
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="height">
        <View
          style={[styles.container, {backgroundColor: this.state.backColor}]}>
          {/* <View> */}
          <View style={styles.AffDetails}>
            <TextInput
              style={styles.textInputStyle}
              placeholder={'Type Here ...'}
              multiline={true}
              //            numberOfLines={4}
              //            value={this.state.text}
              onChangeText={text => this.setState({text: text})}
              autoFocus
              padding={10}
              //color="white"
            />
          </View>
          <View style={styles.colorButtonContainer}>
            <BackgroundColor
              selectedColor={backgroundColorArray[0]}
              onPressColor={color => this.setState({backColor: color})}
              colorArray={backgroundColorArray}
            />
            <View style={styles.saveButtonStyle}>
              <TouchableOpacity
                onPress={() => {
                  // this.savePhoto(this.state.photo);
                  this.onPressSave();
                }}
                disabled={this.state.saveInProgress}>
                <CheckCircle iconSize={70} />
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default BlankCaptionScreen;
