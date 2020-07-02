import {StyleSheet, Dimensions} from 'react-native';
import {
  BACKGROUND_COLOR,
  SEARCH_BAR_COLOR,
  TEXT_BUTTON_COLOR,
} from '../Buttons/index';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: BACKGROUND_COLOR,
  },
  backGroundBackButtonStyle: {
    // backgroundColor: 'red',
    width: 72,
    height: 42,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  headerTextStyle: {
    fontSize: 16,
    paddingHorizontal: 12,
  },
  headerStyle: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'yellow',
  },
  captionStyle: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  tagsContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    position: 'absolute',
    top: 0,
    width: '50%',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.6,
    width: '100%',
    borderRadius: 5,
  },
  cardStyle: {
    width: '33%',
  },
  gridContainer: {height: '100%', width: '100%'},
  searchTagsStyle: {
    // height: 50,
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
    // paddingVertical: 4,
    // justifyContent:'center'
    backgroundColor: SEARCH_BAR_COLOR,
  },
  favContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
    flexDirection: 'row-reverse',
  },
  selectionIconContainer: {position: 'absolute', bottom: 12, right: 2},
  buttonContainerStyle: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'absolute',
    paddingBottom: 4,
    right: -10,
    bottom: 50,
  },
  shareIconContainer: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  shareIconText: {textAlign: 'center', alignContent: 'center', fontSize: 10},
  // scrollViewStyle: {alwaysBounceVertical: true},

  AffText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    // fontWeight: '700',
    margin: 4,
  },
  Layout: {
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    //  width: 160,
    width: '45%',
    height: 120,
    //    borderWidth: 0.3,
    // borderRadius: 15, //Then Make the Border Radius twice the size of width or Height

    flexDirection: 'row',
  },
});
