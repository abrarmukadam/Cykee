import React, {Component} from 'react';
import {GlobalIconSize, GlobalIconColor} from '../index';
import {View, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import {Icon} from 'react-native-elements';
import {AppTour, AppTourView} from 'react-native-app-tour';

class BlankCaptionModeButton extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity
        key={'2nd icon'}
        ref={ref => {
          if (!ref) return;

          this.button3 = ref;
          if (this.props.firstLaunch == false) {
            console.log('run run run');
            let props = {
              order: 13,
              title: 'Only Caption',
              description: `Turn on/off Only Caption Mode...
                




                Touch Screen to close
                `,
              outerCircleColor: '#a231ab',
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
    );
  }
}

export default BlankCaptionModeButton;
