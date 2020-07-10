import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalIconColor, GlobalIconSize} from '../index';
import styles from './styles';
import {AppTour, AppTourView} from 'react-native-app-tour';

class TextMode extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showIconName: this.props.showIconName,
  };
  componentDidMount() {
    // setTimeout(() => {
    //   // console.log('timer running');
    //   this.setState({
    //     showIconName: false,
    //   });
    // }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showIconName != this.props.showIconName) {
      if (this.props.showIconName == false)
        this.setState({
          showIconName: false,
        });
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
          key={'1st icon'}
          ref={ref => {
            if (!ref) return;

            this.button1 = ref;
            if (this.props.firstLaunch == false) {
              console.log('run run run');
              let props = {
                order: 12,
                title: 'Caption on/off',
                description: `Turn on/off Caption Mode...Caption On will give Preview of the photo before it saves.. you can enter your caption there
                




                Touch Screen to close
                `,
                outerCircleColor: '#3f52ae',
                cancelable: true,
                targetRadius: 24,
              };
              this.props.addAppTourTarget &&
                this.props.addAppTourTarget(AppTourView.for(ref, {...props}));
            }
          }}
          onPress={() => {
            // let props = {
            //   order: 11,
            //   title: 'This is a target button 1',
            //   description: 'We have the best targets, believe me',
            //   outerCircleColor: '#f24481',
            // };

            // let targetView = AppTourView.for(this.button1, {
            //   ...props,
            // });

            // AppTour.ShowFor(targetView);
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
