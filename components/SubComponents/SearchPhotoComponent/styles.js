import {StyleSheet, Dimensions} from 'react-native';
import {BACKGROUND_COLOR, SEARCH_BAR_COLOR} from '../Buttons/index';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  searchStyle: {
    paddingStart: 10,
    color: 'black',
    // width: '92%',
    marginRight: 4,
    flex: 1,
    // width: WIDTH - 60,
  },
  searchContainer: {
    backgroundColor: SEARCH_BAR_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // borderRadius: 25,
    marginBottom: 2,
    paddingHorizontal: 10,
    // height: 48,
  },
});
