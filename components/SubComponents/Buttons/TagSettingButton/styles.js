import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  TagIconStyle: {
    // flex: 0,
    // position: 'absolute',
    // top: 80,
    // right: 20,
    // // alignSelf: 'flex-end',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'pink',
  },
  TextStyle: {
    // position: 'absolute',
    // top: 0,
    // right: 40,
    paddingRight: 8,
    // margin: 20,

    fontSize: 10,
    fontWeight: '500',
    // borderWidth: 1,
    // borderColor: 'yellow',

    color: 'white',
  },
});
