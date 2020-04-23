import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  GalleryIconStyle: {
    elevation: 50,
    borderWidth: 0,
    textShadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 5,
    textShadowOffset: {width: 5, height: 2},
  },
});
