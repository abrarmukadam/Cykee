import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class TagSettingButton extends Component {
  render() {
    return (
      <View style={styles.TagIconStyle}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (this.props.tagIconEnabled) {
              this.props.onPressTagName();
              // console.log('onPress Tag');
            }
          }}>
          <Text style={styles.TextStyle}>
            {this.props.showIconName
              ? this.props.tagIconEnabled
                ? `Auto Tag ${this.props.autoTagValue}`
                : 'Auto Tag Off'
              : this.props.tagIconEnabled
              ? this.props.autoTagValue
              : ''}

            {/* {this.props.showIconName
              ? this.props.tagIconEnabled
                ? 'Auto Tag On'
                : 'Auto Tag Off'
              : this.props.tagIconEnabled
              ? this.props.autoTagValue
              : ''} */}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.onPressAutoTagSetting();
          }}>
          <Icon
            name={
              this.props.tagIconEnabled ? 'tag' : 'tago'
              // this.props.textIcon ? 'closed-caption' : 'closed-caption-outline'
            }
            size={GlobalIconSize - 6}
            color={GlobalIconColor}

            // style={{borderWidth:1,borderColor:'red'}}
            // color={? GlobalIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TagSettingButton;
