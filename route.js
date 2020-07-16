import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {CameraScreen} from './components/index';

const RootStack = createStackNavigator(
  {
    Home: {screen: CameraScreen},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
