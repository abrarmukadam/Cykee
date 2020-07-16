import {StyleSheet, Dimensions} from 'react-native';
import {CykeeColor} from '../../SubComponents/Buttons';

const {width: WIDTH} = Dimensions.get('window');
const ELEVATION = 100;
const BORDERWIDTH = 0;
const landmarkSize = 2;

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
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
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
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    // padding: -100,
    borderWidth: 1,
    borderRadius: 20,
    position: 'absolute',
    // borderColor: '#FFD700',
    borderColor: CykeeColor,
    justifyContent: 'center',
    opacity: 0.3,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
});
