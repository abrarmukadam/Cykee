import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  FlashModeStyle: {
    flex: 0,
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
