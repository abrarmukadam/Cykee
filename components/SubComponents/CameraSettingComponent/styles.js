import {StyleSheet, Dimensions} from 'react-native';
import {CykeeColor} from '../../SubComponents/Buttons/index';

const {width: WIDTH} = Dimensions.get('window');
const ELEVATION = 100;
const BORDERWIDTH = 0;

export default StyleSheet.create({
  container: {
    position: 'absolute',

    bottom: '25%',
    right: 10,
    flexDirection: 'column-reverse',
  },
  CameraIconContainer: {
    // borderWidth: 1,
    position: 'absolute',
    bottom: '20%',
    right: 20,
    marginBottom: 44,
    // opacity: 0.8,
    // width: '50%',
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
    alignItems: 'flex-end',
    marginRight: 8,
    justifyContent: 'space-around',
    paddingTop: 20,
    // paddingRight: 20,
    flexDirection: 'column-reverse',
    // borderWidth: 0.2,
    borderColor: CykeeColor,
    // borderRadius: 50,
  },
});
