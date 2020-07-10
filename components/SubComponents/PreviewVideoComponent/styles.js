import {StyleSheet, Dimensions} from 'react-native';
import {CykeeColor} from '../Buttons/index';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    // bottom: 0,
    right: 0,
    height: '100%',
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  innerProgressCompleted: {
    height: 4,
    // backgroundColor: '#cccccc',
    backgroundColor: CykeeColor,
  },
  innerProgressRemaining: {
    height: 4,
    // backgroundColor: SIDE_ICON_COLOR,
    backgroundColor: 'white',
  },
  generalControls: {
    position: 'absolute',
    flex: 1,
    height: 80,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
    flexDirection: 'row',
    // borderRadius: 4,
    overflow: 'hidden',
    left: 0,
    bottom: 0,
    right: 0,

    // paddingBottom: 10,
  },

  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  trackingControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pauseButtonStyle: {
    marginHorizontal: 4,
  },
  timeTextStyle: {
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 4,
  },
});
