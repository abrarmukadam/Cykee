import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  GlobalIconSize,
  CykeeColor,
  FONT_ICON_COLOR,
  FONT_ICON_OPACITY,
  SIDE_ICON_COLOR,
} from '../index';

class EditScreenButton extends Component {
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
          name={this.props.iconName}
          size={GlobalIconSize - 10}
          color={SIDE_ICON_COLOR}
          underlayColor={'black'}
          reverse={true}
          reverseColor={CykeeColor}
          containerStyle={[
            styles.sideButtonStyle,
            {
              // position: this.props.topPosition ? 'absolute' : 'relative',
              top: this.props.topPosition ? this.props.topPosition : 0,
              opacity: this.props.iconOpacity
                ? this.props.iconOpacity
                : FONT_ICON_OPACITY,
            },
          ]}
          onPress={() => this.props.handleOnPress()}
        />
      </View>
    );
  }
}

export default EditScreenButton;

const styles = StyleSheet.create({
  sideButtonStyle: {},
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {fontSize: 10, color: 'white'},
});
