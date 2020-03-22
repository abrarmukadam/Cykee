import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  GalleryIconStyle: {
    flex: 0,
    // position: 'absolute',
    // bottom: 20,
    // right: 20,
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
});
