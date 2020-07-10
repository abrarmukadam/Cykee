import React, {Component} from 'react';
import {GlobalIconSize, GlobalIconColor} from '../index';
import {View, TouchableOpacity, Text} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';
import {AppTour, AppTourView} from 'react-native-app-tour';
import styles from './styles';

class BlankCaptionModeButton extends Component {
  state = {};

  render() {
    return (
      <View style={styles.TextModeStyle}>
        {this.props.showIconName && (
          <Text style={styles.TextStyle}>Blank Screen</Text>
        )}

        <TouchableOpacity
          key={'2nd icon'}
          ref={ref => {
            if (!ref) return;

            this.button3 = ref;
            if (this.props.firstLaunch == false) {
              let props = {
                order: 13,
                title: 'Blank Screen',
                description: `Creates a blank screen for you to write a note...
                




                Touch Screen to close
                `,
                outerCircleColor: this.props.toolTipColor,

                // outerCircleColor: '#a231ab',
                cancelable: true,
                targetRadius: 24,
              };
              this.props.addAppTourTarget &&
                this.props.addAppTourTarget(AppTourView.for(ref, {...props}));
            }
          }}
          onPress={() => {
            this.props.onPressBlankCaption();
          }}>
          <Icon
            type={'material-community'}
            name={'file-document-edit-outline'}
            size={GlobalIconSize}
            color={GlobalIconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default BlankCaptionModeButton;
