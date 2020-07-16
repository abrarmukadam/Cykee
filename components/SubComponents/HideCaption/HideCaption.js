import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {CykeeColor, TEXT_BUTTON_COLOR} from '../Buttons/index';

class HideCaption extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    if (this.props.screenMounted == 'CameraRollScreen') return <View />;
    return (
      <Button
        title={this.props.hideCaption ? 'Show Caption' : 'Hide Caption'}
        type="clear"
        // titleStyle={{color: '#ff6663'}}
        titleStyle={{color: TEXT_BUTTON_COLOR}}
        onPress={() => this.props.hideCaptionAction(!this.props.hideCaption)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HideCaption;
