import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {EditScreenButton} from '../Buttons/index';
import styles from './styles';

class EditIconsComponent extends Component {
  state = {
    showEditOptions: this.props.showEditOptions,
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.showEditOptions && (
          <EditScreenButton
            iconType="ionicon"
            iconName="md-crop"
            // topPosition={70}
            handleOnPress={this.props.cropPressed}
            buttonText={this.props.showIconName ? 'Crop' : ''}
          />
        )}
        {this.state.showEditOptions && (
          <EditScreenButton
            iconType="material-community"
            iconName="rotate-right"
            // topPosition={120}
            buttonText={this.props.showIconName ? 'Rotate' : ''}
            handleOnPress={this.props.rotatePressed}
          />
        )}
        {this.state.showEditOptions && this.props.prevPhoto.source && (
          <EditScreenButton
            iconType="material-community"
            iconName="undo"
            buttonText={this.props.showIconName ? 'Undo' : ''}
            // topPosition={170}
            handleOnPress={this.props.undoPressed}
          />
        )}
        {this.state.showEditOptions && this.props.nextPhoto.source && (
          <EditScreenButton
            iconType="material-community"
            iconName="redo"
            buttonText={this.props.showIconName ? 'Redo' : ''}
            // topPosition={170}
            handleOnPress={this.props.redoPressed}
          />
        )}

        <EditScreenButton
          iconType="entypo"
          iconName={
            this.state.showEditOptions
              ? 'chevron-small-down'
              : 'chevron-small-up'
          }
          // topPosition={20}
          handleOnPress={() =>
            this.setState({
              showEditOptions: !this.state.showEditOptions,
            })
          }
        />
      </View>
    );
  }
}

export default EditIconsComponent;
