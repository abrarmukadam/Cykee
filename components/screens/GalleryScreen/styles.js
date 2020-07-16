import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

import {TAB_BAR_COLOR} from '../../SubComponents/Buttons/index';
export default StyleSheet.create({
  container: {
    // flex: 1,
    // height: '100%',
    // width: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  backButtonStyle: {
    // flex: 1,
    // borderWidth: 1,
    // alignSelf: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  topContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: '12%',
    // paddingTop: '10%',
    backgroundColor: TAB_BAR_COLOR,
    width: '100%',
    // paddingVertical: 4,
    paddingHorizontal: 14,
    borderWidth: 0.01,
    elevation: 90,
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 6,
  },
  bottomContainer: {
    flex: 0,
    position: 'absolute',
    bottom: 0,
    // backgroundColor: 'white',
    width: '100%',
  },
  bottomSubContainer: {
    // backgroundColor: 'white',
    backgroundColor: TAB_BAR_COLOR,
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
  dateStyle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },
  timeStyle: {
    fontWeight: '600',
    color: 'grey',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  tagStyle: {
    // flexWrap: 'wrap',
    width: 145,
    // paddingTop: 2,
    height: 50,
    // borderWidth: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-start',
    flexDirection: 'row',
  },
});
