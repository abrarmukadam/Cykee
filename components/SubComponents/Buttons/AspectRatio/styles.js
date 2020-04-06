import {StyleSheet, Dimensions} from 'react-native';
import {GlobalIconColor, GlobalIconSize} from '../index';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  AspectRatioStyle: {
    // flex: 0,
    // position: 'absolute',
    // top: 140,
    // right: 20,
    // alignSelf: 'center',
    // marginBottom: 10,
  },
  TextStyle: {
    // fontSize: GlobalIconSize - 10,
    fontSize: 20,
    color: 'white',
    // color: GlobalIconColor,
  },
});
