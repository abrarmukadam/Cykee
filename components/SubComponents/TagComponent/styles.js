import {StyleSheet, Dimensions} from 'react-native';
import {
  BACKGROUND_COLOR,
  SEARCH_BAR_COLOR,
  CAPTION_FONT,
  CAPTION_SIZE,
} from '../Buttons/index';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    // position: 'absolute',
    // flex: 1,
    // width: WIDTH,
    // bottom: 0,
    // left: 0,

    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: 'grey',
    width: 220,
    // height: 100,

    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
    left: -20,
    bottom: 70,
    borderRadius: 40,
  },
  fontStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    borderRadius: 10,
    marginHorizontal: 6,
    marginRight: 70,
    fontFamily: 'normal',
  },
  tag: {
    backgroundColor: 'silver',
    height: 24,
    marginHorizontal: 2,
    // paddingHorizontal: 0,
  },
  tagTextStyle: {
    color: 'white',
    fontSize: 12,
  },
  tagsViewStyle: {
    marginRight: 70,
    // backgroundColor: 'green',
  },
});
