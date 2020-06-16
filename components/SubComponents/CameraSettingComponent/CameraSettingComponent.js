import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import {
  AspectRatio,
  TextMode,
  FlashMode,
  TagSettingButton,
  MoreIcon,
  FaceDetection,
} from '../Buttons/index';
import DialogInput from 'react-native-dialog-input';

import styles from './styles';

class CameraSettingComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showTagDialog: false,
    showIconName: true,
    // animationOpen: new Animated.Value(0),
  };
  componentDidMount() {
    // Animated.timing(this.state.animation, {
    //   toValue: 1,
    //   duration: 400,
    //   // useNativeDriver: true,
    // }).start();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showIconName) {
      console.log('CameraScreen-didUpdate-showIconName');
      setTimeout(() => {
        console.log('Timer:this.state.showIconName');
        this.setState({showIconName: false});
      }, 3000);
    }
    // if (this.props.hideCameraSettingsIcons) {
    //   Animated.timing(this.state.animationOpen, {
    //     toValue: 1,
    //     duration: 1000,
    //   }).start();
    // }
  }
  changeFlashMode = () => {
    //"FlashMode": {"auto": 3, "off": 0, "on": 1, "torch": 2}
    if (this.props.flashMode < 3)
      this.props.changeFlashMode(this.props.flashMode + 1);
    else this.props.changeFlashMode(0);
  };

  EnterAutoTag = () => (
    <DialogInput
      isDialogVisible={
        // true
        this.state.showTagDialog
      }
      title={'Auto Tag'}
      message={'Set Tag for your upcoming photos'}
      hintInput={'Enter Tag...'}
      submitInput={input => {
        let inputTagText = input;
        if (inputTagText[0] != '#' && inputTagText.length)
          inputTagText = '#' + input;
        else if (inputTagText[0] == '#' && inputTagText.length <= 1)
          inputTagText = '';
        this.props.autoTagSetting(inputTagText);
        this.setState({showTagDialog: false});
      }}
      initValueTextInput={this.props.autoTagValue}
      closeDialog={() => {
        this.setState({inputTagText: ''});
        this.setState({showTagDialog: false});
        // this.showDialog(false);
      }}
    />
  );
  render() {
    return (
      <View
        style={[
          styles.CameraIconContainer,
          {
            // borderWidth: 1,
            // borderColor: 'green',
          },
        ]}>
        <MoreIcon
          expandOptions={this.props.hideCameraSettingsIcons}
          onPressMore={() => {
            if (!this.props.hideCameraSettingsIcons)
              this.setState({showIconName: true});
            this.props.hideCameraSettings(!this.props.hideCameraSettingsIcons);
          }}
        />
        <View
          style={[
            styles.HidingIconContainer,
            // {borderWidth: 1, borderColor: 'red'},
          ]}>
          {this.props.hideCameraSettingsIcons && (
            <View>
              <FlashMode
                flashIcon={this.props.flashMode}
                onPressFlashMode={() => this.changeFlashMode()}
                showIconName={this.state.showIconName}
              />
              <TextMode
                addAppTourTarget={this.props.addAppTourTarget}
                textIcon={this.props.textMode}
                onPressTextMode={() =>
                  this.props.changeTextMode(!this.props.textMode)
                }
                showIconName={this.state.showIconName}
                firstLaunch={this.props.firstLaunch}
              />
              {/* <FaceDetection
                faceDetectionIcon={this.props.faceDetectionMode}
                onPressFaceDetectionMode={() =>
                  this.props.changeFaceDetectionMode(
                    !this.props.faceDetectionMode,
                  )
                }
                showIconName={this.state.showIconName}
              /> */}
              {/* <AspectRatio
                aspectIcon={this.props.aspectRatio}
                onPressAspectRatio={() => {
                  this.props.onPressAspectRatio();
                  this.props.changeAspectRatio(!this.props.aspectRatio);
                }}
                showIconName={this.state.showIconName}
              /> */}

              {this.props.autoTagEnabled &&
                // this.props.autoTagValue.length <= 1 &&
                this.state.showTagDialog &&
                this.EnterAutoTag()}
            </View>
          )}
          {!(
            !this.props.hideCameraSettingsIcons && !this.props.autoTagEnabled
          ) && (
            <TagSettingButton
              addAppTourTarget={this.props.addAppTourTarget}
              firstLaunch={this.props.firstLaunch}
              showIconName={this.state.showIconName}
              onPressAutoTagSetting={() => {
                if (
                  this.props.autoTagValue.length <= 1 &&
                  !this.props.autoTagEnabled
                )
                  this.setState({
                    showTagDialog: true,
                  });
                else
                  this.setState({
                    showTagDialog: false,
                  });

                this.props.setAutoTagEnabled(!this.props.autoTagEnabled);
              }}
              onPressTagName={() => {
                this.setState({showTagDialog: true});
                this.props.hideCameraSettings(true);

                // this.EnterAutoTag();
              }}
              tagIconEnabled={this.props.autoTagEnabled}
              autoTagValue={
                this.props.autoTagValue ? this.props.autoTagValue : 'No Tag set'
              }
            />
          )}
        </View>
      </View>
    );
  }
}

export default CameraSettingComponent;
