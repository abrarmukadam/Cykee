import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const ELEVATION = 100;
const BORDERWIDTH = 0;

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  preview: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
  },
  slider: {
    height: 30,
    marginLeft: 7,
  },
  bottomContainer: {
    flex: 0,
    // opacity: 0.6,
    // height: '100%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
  },
  CameraIconContainer: {
    // borderWidth: 1,
    position: 'absolute',
    top: '15%',
    right: 0,
    marginBottom: 40,
    opacity: 0.8,
    width: 60,
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
    // border
    // height: '100%',
    // width: '100%',
    // flexDirection: '',
    alignItems: 'center',
    marginRight: 4,
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
});
