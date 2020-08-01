import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ToggleSwitch from 'toggle-switch-react-native';

import {
  backgroundColorArray,
  GlobalIconSize,
  CheckCircle,
  saveFileFunction,
  FontIconsComponent,
  CAPTION_FONT,
  CAPTION_FONT_IOS,
  CAPTION_SIZE,
  TagComponent,
  CykeeColor,
} from '../../SubComponents/Buttons/index';

const BLANK_CAPTION = 'blankCaption';

class BlankCaptionScreen extends Component {
  state = {
    // colorIndex: 0,
    backColor: 0,
    saveInProgress: false,
    captionSize: 0,
    captionFont: 0,
    tagPressed: false,
    tagText: '',
    tagsArray: this.props.autoTagEnabled
      ? this.props.autoTagValue.length
        ? [this.props.autoTagValue]
        : []
      : [],
  };

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
  captionSizePressed = () => {
    if (this.state.captionSize >= 2) this.setState({captionSize: 0});
    else this.setState({captionSize: this.state.captionSize + 1});
    console.log('captionSize Pressed');
  };
  captionFontPressed = () => {
    if (this.state.captionFont >= 3) this.setState({captionFont: 0});
    else
      this.setState({
        captionFont: this.state.captionFont + 1,
      });
  };
  tagPressed = () => {
    this.setState({tagPressed: !this.state.tagPressed});
  };
  tagsArrayChanged = tagsArray => {
    this.setState({tagsArray});
    this.props.autoTagSetting(tagsArray[0]);
    // console.log(tagsArray);
  };

  onPressSave = () => {
    this.setState({saveInProgress: true});

    saveFileFunction({
      data: {},
      fileType: BLANK_CAPTION,
      caption: this.state.text,
      captionStyle: {
        captionSize: this.state.captionSize,
        captionFont: this.state.captionFont,
      },
      fav_status: false,
      tagsArray: this.state.tagsArray,
      saveType: 'add',
      callingScreen: 'BlankCaptionScreen',
      backColor: this.state.backColor,
      // backColor: backgroundColorArray[this.state.colorIndex],
      addNewPhoto: newPhoto => this.props.addNewPhoto(newPhoto),
      afterSaveFunction: () => this.props.navigation.goBack(),
    });
    //    this.props.handleAddAffirmation(newAffirmation)
  };
  changeBackColorPressed = () => {
    console.log('backColor:', this.state.backColor);
    if (this.state.backColor >= backgroundColorArray.length - 1)
      this.setState({backColor: 0});
    else this.setState({backColor: this.state.backColor + 1});
    console.log('change color pressed');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="height">
        <View
          style={[
            styles.container,
            {backgroundColor: backgroundColorArray[this.state.backColor]},
          ]}>
          {/* <View> */}
          <View style={styles.AffDetails}>
            <TextInput
              style={[
                styles.textInputStyle,
                {
                  fontFamily: Platform.OS
                    ? CAPTION_FONT_IOS[this.state.captionFont]
                    : CAPTION_FONT[this.state.captionFont],
                },
              ]}
              placeholderTextColor="white"
              placeholder={'Type Here ...'}
              multiline={true}
              //            numberOfLines={4}
              //            value={this.state.text}
              value={this.state.text}
              onChangeText={text => {
                if (text.length <= 125) this.setState({text: text});
                else
                  ToastAndroid.show('Caption too Long !', ToastAndroid.SHORT);
              }}
              autoFocus
              padding={10}
            />
          </View>
          {/* <View style={styles.colorButtonContainer}>
            <BackgroundColor
              selectedColor={backgroundColorArray[0]}
              onPressColor={color => this.setState({backColor: color})}
              colorArray={backgroundColorArray}
            />
          </View> */}

          <View style={styles.bottomContainer}>
            <FontIconsComponent
              type={BLANK_CAPTION}
              showFontIcons={this.props.showFontIcons}
              captionFontPressed={this.captionFontPressed}
              captionSizePressed={this.captionSizePressed}
              tagPressed={this.tagPressed}
              enterTag={this.state.tagPressed}
              tagsArray={this.props.autoTagEnabled}
              showIconName={this.props.photoArray.length < 5 ? true : false}
              // firstLaunch={true}
              changeBackColorPressed={this.changeBackColorPressed}
              firstLaunch={this.props.photoArray[0] ? true : false}
            />

            <View
              style={[
                styles.textBoxContainer,
                {
                  // borderWidth: 1,
                  // borderColor: 'red',
                  // backgroundColor: 'yellow',
                },
              ]}>
              {this.state.tagPressed && (
                <ToggleSwitch
                  isOn={this.props.autoTagEnabled}
                  onColor={CykeeColor}
                  offColor="grey"
                  label={`Enable auto-Tag ${
                    this.state.tagsArray[0] && this.props.autoTagEnabled
                      ? `'${this.state.tagsArray[0]}'`
                      : ''
                  }`}
                  labelStyle={{color: 'white', fontWeight: '900'}}
                  size="small"
                  onToggle={() =>
                    this.props.setAutoTagEnabled(!this.props.autoTagEnabled)
                  }
                />
              )}
              {this.state.tagPressed && (
                <TagComponent
                  tagsArrayChanged={this.tagsArrayChanged}
                  tagsArray={this.state.tagsArray}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.saveButtonStyle}>
          <TouchableOpacity
            onPress={() => {
              console.log('saving blank caption');
              // this.savePhoto(this.state.photo);
              this.onPressSave();
            }}
            // disabled={this.state.saveInProgress}
          >
            <CheckCircle iconSize={70} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default BlankCaptionScreen;
