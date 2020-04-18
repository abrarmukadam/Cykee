import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    //  flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'black',
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
