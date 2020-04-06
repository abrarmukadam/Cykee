import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

const GalleryIconSize = 40;
export default StyleSheet.create({
  IconContainer: {
    //  flex: 1,
    height: GalleryIconSize,
    width: GalleryIconSize,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  ImageStyle: {
    flex: 1,
    opacity: 1,
    // resizeMode: 'contain',
    width: GalleryIconSize,
    height: GalleryIconSize,
  },
});
