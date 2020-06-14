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
    alignItems: 'center',
  },
  timeContainerStyle: {
    position: 'absolute',
    top: -22,
  },
  timeTextStyle: {
    color: 'white',
  },
});
