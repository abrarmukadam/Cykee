import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    // flex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    // flexDirection: 'column',

    backgroundColor: 'black',
  },

  image: {
    flex: 1,
  },
  crossButtonStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  bottomContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    // flexDirection: 'row',
  },
  saveButtonStyle: {
    position: 'absolute',
    bottom: 35,
    right: '4%',
    paddingHorizontal: 4,
  },

  textBoxContainer: {
    paddingVertical: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    width: '100%',
    // position: 'absolute',
    // bottom: 0,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  textInputStyle: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 20,

    // backgroundColor: 'grey',
    //    color: '#fffafa',
    color: 'white',

    // fontWeight: 'bold',
    // fontStyle: 'italic',
    borderRadius: 10,
    marginHorizontal: 6,
    marginRight: 70,
  },
});
