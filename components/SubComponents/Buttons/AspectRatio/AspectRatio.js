import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {GlobalIconColor, GlobalIconSize} from '../index';

class AspectRatio extends Component {
  render() {
    return (
      <View style={styles.AspectRatioStyle}>
        <Text style={styles.TextStyle}>
          {this.props.showIconName ? 'Screen Size' : ''}
        </Text>
        <TouchableOpacity onPress={() => this.props.onPressAspectRatio()}>
          <Icon
            name={this.props.aspectIcon ? 'resize-full-screen' : 'resize-100-'}
            // name={this.props.aspectIcon ? 'size-fullscreen' : 'size-actual'}
            size={
              this.props.aspectIcon ? GlobalIconSize - 6 : GlobalIconSize - 6
            }
            // size={GlobalIconSize - 6}
            color={GlobalIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default AspectRatio;
