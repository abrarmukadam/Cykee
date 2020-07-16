import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  TakePictureStyle: {
    flex: 0,
    //    position: 'absolute',
    //    bottom: 0,
    // justifyContent:'flex-end',
    // alignSelf: 'center',
    marginBottom: 10,
    paddingLeft: -4,
    alignItems: 'center',
  },
  timeContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -22,
  },
  timeTextStyle: {
    paddingHorizontal: 4,
    color: 'white',
  },
});
