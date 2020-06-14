import {StyleSheet, Dimensions} from 'react-native';
import {GlobalLargeIconSize} from '..';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    opacity: 0.5,
    position: 'absolute',
    bottom: HEIGHT / 2 - GlobalLargeIconSize / 2 - 10,
    left: WIDTH / 2 - GlobalLargeIconSize / 2 - 10,
  },
});
