import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';

class TextMode extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showIconName: this.props.showIconName,
  };
  componentDidMount() {
    setTimeout(() => {
      // console.log('timer running');
      this.setState({
        showIconName: false,
      });
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showIconName != this.state.showIconName) {
    }
  }
  render() {
    return (
      <View style={styles.TextModeStyle}>
        {this.state.showIconName && (
          <Text style={styles.TextStyle}>
            {this.props.textIcon ? 'Caption On' : 'Caption Off'}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            this.setState({showIconName: true});
            setTimeout(() => {
              // console.log('timer running');
              this.setState({
                showIconName: false,
              });
            }, 2000);
            this.props.onPressTextMode();
          }}>
          <Icon
            name={
              this.props.textIcon ? 'closed-caption' : 'closed-caption-outline'
              // this.props.textIcon ? 'closed-caption' : 'closed-caption-outline'
            }
            size={GlobalIconSize}
            color={GlobalIconColor}
            // color={? GlobalIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TextMode;
