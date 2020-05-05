import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {CykeeColor} from '../Buttons/index';

class HideCaption extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <Button
        title={this.props.hideCaption ? 'Show Caption' : 'Hide Caption'}
        type="clear"
        titleStyle={{color: '#F79F79'}}
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
