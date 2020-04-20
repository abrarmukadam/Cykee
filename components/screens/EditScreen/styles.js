import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    //  flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#0000',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000',
  },
  buttonContainer: {
    position: 'absolute',
    top: 220,
    right: 20,

    backgroundColor: '#0000',
    // borderRadius: 1,
    // borderWidth: 0.1,
    padding: 1,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.6,
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
  crossButtonStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  undoButtonStyle: {
    position: 'absolute',
    top: 20,
    right: WIDTH / 2 + 30,
    // backgroundColor: '#0000', // invisible color
  },
  redoButtonStyle: {
    position: 'absolute',
    top: 20,
    right: WIDTH / 2 - 30,
  },
  saveButtonStyle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  cropButtonStyle: {
    position: 'absolute',
    top: 80,
    right: 20,

    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // iOS
    shadowOffset: {
      width: 0, // These can't both be 0
      height: 1, // i.e. the shadow has to be offset in some way
    },
    // Android
    shadowOffset: {
      width: 0, // Same rules apply from above
      height: 1, // Can't both be 0
    },
  },
  rotateButtonStyle: {
    position: 'absolute',
    top: 120,
    right: 20,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    borderRadius: 10,
    marginHorizontal: 6,
    textAlign: 'center',
  },
  textBoxContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    // paddingBottom: 10,
    flexDirection: 'row',
    // backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    opacity: 0.7,
  },
});
