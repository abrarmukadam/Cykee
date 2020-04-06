import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    flexDirection: 'column',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  crossButtonStyle: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  saveButtonStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
