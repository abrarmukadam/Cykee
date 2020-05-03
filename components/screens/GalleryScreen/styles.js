import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    // flex: 1,
    // height: '100%',
    // width: '100%',
    ...StyleSheet.absoluteFillObject,
  },

  topContainer: {
    flex: 1,
    // height: '80%',
    position: 'absolute',
    top: '5%',
    // paddingVertical: 4,
    paddingHorizontal: 14,
    borderWidth: 0.01,
    elevation: 90,
  },
  bottomContainer: {
    flex: 0,
    position: 'absolute',
    bottom: 0,
    // backgroundColor: 'white',
    width: '100%',
  },
  bottomSubContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  IconTextStyle: {
    fontSize: 10,
    color: 'black',
    paddingTop: 2,
    paddingBottom: 2,
  },
  IconContainer: {
    flex: 4,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    // flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    // flexDirection: 'column',
  },
  ItemContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    // bottom: 0,
  },
  captionStyle: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.6,
    width: '100%',
    borderRadius: 5,
  },
});
