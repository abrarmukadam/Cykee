import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

const GalleryIconSize = 40;
export default StyleSheet.create({
  IconContainer: {
    height: GalleryIconSize,
    width: GalleryIconSize,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  ImageStyle: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    opacity: 1,
    borderWidth: 0.5,
    borderColor: 'white',
    width: GalleryIconSize,
    height: GalleryIconSize,
  },
});
