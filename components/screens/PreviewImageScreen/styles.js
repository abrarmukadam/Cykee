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
    flex: 1,
    resizeMode: 'center',
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
  saveButtonStyle: {
    flex: 0,
    alignSelf: 'center',
    paddingHorizontal: 4,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 20,
    // backgroundColor: 'grey',
    //    color: '#fffafa',
    color: 'white',

    // fontWeight: 'bold',
    // fontStyle: 'italic',
    borderRadius: 10,
    marginHorizontal: 6,
  },
  textBoxContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'black',
    // flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    opacity: 0.7,
  },
});
