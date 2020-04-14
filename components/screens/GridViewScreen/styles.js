import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 2,
  },
  headerTextStyle: {
    fontSize: 20,
    paddingHorizontal: 12,
  },
  headerStyle: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: 'row',
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
    // activeOpacity: 0.2,
    width: '33%',
    height: 200,
    // marginVertical: 1,
    // height: '30%',
    // borderRadius: 24,
  },
  gridContainer: {height: '100%', width: '100%'},
  searchContainer: {backgroundColor: 'grey', borderRadius: 25, marginBottom: 2},
  searchStyle: {paddingStart: 10, color: 'white'},
  favContainer: {position: 'absolute', top: 2, right: 2},
});
