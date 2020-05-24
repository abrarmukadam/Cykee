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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 0.2,
    borderColor: 'white',
    paddingVertical: 2,
  },

  TextStyle: {
    // fontSize: GlobalIconSize - 10,
    position: 'absolute',
    // top: 0,
    right: 40,
    fontSize: 10,
    color: 'white',
    fontWeight: '500',
    // fontFamily: '',

    // color: GlobalIconColor,
  },
});
