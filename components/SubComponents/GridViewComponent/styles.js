import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 2,
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
    fontSize: 20,
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
  searchContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // borderRadius: 25,
    marginBottom: 2,
    paddingHorizontal: 30,
  },
  searchStyle: {paddingStart: 10, color: 'black', width: WIDTH - 100},
  favContainer: {position: 'absolute', top: 2, right: 2},
  selectionIconContainer: {position: 'absolute', bottom: 12, right: 2},
  buttonContainerStyle: {
    flex: 0,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignSelf: 'flex-start',
    position: 'absolute',
    paddingHorizontal: '20%',
    paddingBottom: 4,
    bottom: 0,
  },
  shareIconContainer: {
    justifyContent: 'flex-end',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  shareIconText: {textAlign: 'center', alignContent: 'center', fontSize: 10},
  // scrollViewStyle: {alwaysBounceVertical: true},
});
