import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  TextModeStyle: {
    // flex: 0,
    // position: 'absolute',
    // top: 80,
    // right: 20,
    // // alignSelf: 'flex-end',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextStyle: {
    position: 'absolute',
    // top: 0,
    right: 40,
    fontSize: 10,
    fontWeight: '500',

    color: 'white',
  },
});
