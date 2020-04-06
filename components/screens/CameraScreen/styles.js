import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    // flex: 1,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
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
  },
  CameraIconContainer: {
    // borderWidth: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    // flex: 1,
    marginBottom: 40,
    opacity: 0.8,
    width: 60,
    // height: '100%',
    // width: '100%',
    // flexDirection: '',
    alignItems: 'center',
    marginRight: 4,
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});
