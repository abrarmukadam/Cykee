import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  AspectRatio,
  TextMode,
  FlashMode,
  TagSettingButton,
  MoreIcon,
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
  };

  componentDidUpdate() {
    if (this.state.showIconName) {
      console.log('CameraScreen-didUpdate-showIconName');
      setTimeout(() => {
        console.log('Timer:this.state.showIconName');
        this.setState({showIconName: false});
      }, 3000);
    }
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
      <View style={[styles.CameraIconContainer, {borderWidth: 0}]}>
        {this.props.hideCameraSettingsIcons && (
          <View>
            <AspectRatio
              aspectIcon={this.props.aspectRatio}
              onPressAspectRatio={() => {
                this.props.onPressAspectRatio();
                this.props.changeAspectRatio(!this.props.aspectRatio);
              }}
              showIconName={this.state.showIconName}
            />
            <TextMode
              textIcon={this.props.textMode}
              onPressTextMode={() =>
                this.props.changeTextMode(!this.props.textMode)
              }
              showIconName={this.state.showIconName}
            />
            <FlashMode
              flashIcon={this.props.flashMode}
              onPressFlashMode={() => this.changeFlashMode()}
              showIconName={this.state.showIconName}
            />
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
              // this.EnterAutoTag();
            }}
            tagIconEnabled={this.props.autoTagEnabled}
            autoTagValue={
              this.props.autoTagValue ? this.props.autoTagValue : 'No Tag set'
            }
          />
        )}
        <MoreIcon
          expandOptions={this.props.hideCameraSettingsIcons}
          onPressMore={() => {
            this.setState({showIconName: true});
            this.props.hideCameraSettings(!this.props.hideCameraSettingsIcons);
          }}
        />
      </View>
    );
  }
}

export default CameraSettingComponent;
