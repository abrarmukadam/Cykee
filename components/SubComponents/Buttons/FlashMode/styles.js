import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  FlashModeStyle: {
    flexDirection: 'row',
    alignItems: 'center',

    // flex: 0,
    // position: 'absolute',
    // top: 20,
    // right: 20,
    // alignSelf: 'center',
    // marginBottom: 10,
  },
  TextStyle: {
    // fontSize: GlobalIconSize - 10,
    position: 'absolute',
    // top: 0,
    right: 40,
    fontSize: 10,
    color: 'white',
    fontWeight: '500',
    // color: GlobalIconColor,
  },
});
