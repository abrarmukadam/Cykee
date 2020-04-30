import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const ELEVATION = 90;
const BORDERWIDTH = 0;

export default StyleSheet.create({
  container: {
    //  flex: 1,

    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'black',
    // backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    resizeMode: 'contain',
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
  },

  crossButtonStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
  },
  undoButtonStyle: {
    backgroundColor: '#0000',
    position: 'absolute',
    top: 60,
    right: WIDTH / 2,
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
  },
  redoButtonStyle: {
    position: 'absolute',
    top: 60,
    right: WIDTH / 2 - 50,
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
  },
  saveButtonStyle: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    elevation: ELEVATION,
    borderWidth: BORDERWIDTH,
  },

  sideButtonStyle: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  textInputStyle: {
    // flex: 1,
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
    paddingRight: 40,
    // paddingBottom: 10,
    // flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    opacity: 0.7,
  },
});
