import {StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    //  flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topContainer: {
    flex: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    borderColor: 'red',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  bottomContainer: {
    flex: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
  },
  bottomSubContainer: {
    marginTop: 4,
    flexDirection: 'row',
    // paddingHorizontal: 14,
    justifyContent: 'space-between',
    // borderWidth: 1,
  },

  IconTextStyle: {
    fontSize: 10,
    color: 'black',
    paddingTop: 2,
    paddingBottom: 2,
  },
  IconContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
