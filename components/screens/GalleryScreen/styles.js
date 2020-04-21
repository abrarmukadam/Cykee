import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },

  topContainer: {
    flex: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    // borderColor: 'red',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 14,
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
    marginTop: 4,
    flexDirection: 'row',
    // paddingHorizontal: 14,
    justifyContent: 'space-between',
    // borderWidth: 1,
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
