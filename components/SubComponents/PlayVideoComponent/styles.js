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
    // backgroundColor: 'red',
    // borderRadius: 5,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // borderWidth: 1,
    // borderColor: 'green',
    // width: '100%',
    // height: 100,
    // borderWidth: 1,
    // borderColor: 'blue',
    // backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progress: {
    position: 'absolute',
    bottom: 20,

    width: '100%',
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    // alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: 'white',
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
    bottom: 10,
    left: 10,
    right: 10,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButtonStyle: {
    // marginHorizontal: 4,
  },
  pauseButtonContainer: {
    width: 50,
    // height: 40,
    // borderWidth: 2,
    // borderColor: 'black',
  },
  timeTextStyle: {
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 4,
  },
  videoStyle: {
    backgroundColor: 'red',
    // height: '70%',
  },
});
