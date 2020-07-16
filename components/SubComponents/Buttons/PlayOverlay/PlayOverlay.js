import React, {Component} from 'react';
import {GlobalLargeIconSize, CykeeColor} from '../index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

class PlayOverlay extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPressPlay()}>
        <Icon
          name="play-circle-outline"
          size={
            this.props.iconSize ? this.props.iconSize : GlobalLargeIconSize + 20
          }
          color={CykeeColor}
        />
      </TouchableOpacity>
    );
  }
}

export default PlayOverlay;
