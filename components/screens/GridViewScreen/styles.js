import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 2,
  },
});
