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
          />
        )}
        {this.state.showEditOptions && (
          <EditScreenButton
            iconType="material-community"
            iconName="rotate-right"
            // topPosition={120}
            handleOnPress={this.props.rotatePressed}
          />
        )}
        {this.state.showEditOptions && this.props.prevPhoto.source && (
          <EditScreenButton
            iconType="ionicon"
            iconName="md-undo"
            // topPosition={170}
            handleOnPress={this.props.undoPressed}
          />
        )}
        {this.state.showEditOptions && this.props.nextPhoto.source && (
          <EditScreenButton
            iconType="ionicon"
            iconName="md-redo"
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
