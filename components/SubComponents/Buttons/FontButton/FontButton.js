import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  GlobalIconSize,
  CykeeColor,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
} from '../index';

class FontButton extends Component {
  state = {showIconName: true};
  componentDidMount() {
    setTimeout(() => {
      console.log('timer running');
      this.setState({
        showIconName: false,
      });
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.showIconName && (
          <Text style={styles.textStyle}>{this.props.buttonText}</Text>
        )}
        <Icon
          type={this.props.iconType}
          name={this.props.buttonName}
          size={GlobalIconSize - 10}
          color={FONT_ICON_COLOR}
          underlayColor={'black'}
          reverse={true}
          reverseColor={CykeeColor}
          containerStyle={[
            styles.fontButtonStyle,
            {opacity: FONT_ICON_OPACITY},
          ]}
          onPress={() => {
            this.props.handleOnPress();
          }}
        />
      </View>
    );
  }
}

export default FontButton;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  textStyle: {fontSize: 10, color: 'white'},
  fontButtonStyle: {alignItems: 'flex-end', justifyContent: 'flex-end'},
});
