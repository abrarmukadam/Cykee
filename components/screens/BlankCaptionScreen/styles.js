import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    // flex: 1,
    justifyContent: 'center',
    // width: WIDTH,
  },
  AffDetails: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  textInputStyle: {
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
  },
  sendButtonStyle: {
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  colorButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 20,
    padding: 2,
    color: 'white',
  },
  crossButtonStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  saveButtonStyle: {
    position: 'absolute',
    bottom: 50,
    right: '4%',
    paddingHorizontal: 4,
    // borderWidth: 1,
  },
});
