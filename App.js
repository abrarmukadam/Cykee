import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Component} from 'react';
import {PreviewImageScreen} from './components/index';
import {store, persistor} from './redux-store';

import {default as CameraScreen} from './components/screens/CameraScreen/CameraScreen.container';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const config = {
  // animation: 'spring',
  config: {
    // stiffness: 1000,
    // damping: 500,
    // mass: 3,
    // overshootClamping: true,
    // restDisplacementThreshold: 0.01,
    // restSpeedThreshold: 0.01,
  },
};
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
      screenOptions={{
        headerTintColor: 'white',
        // headerStyle: {backgroundColor: 'tomato'},
      }}>
      <Stack.Screen
        name="Home"
        component={CameraScreen}
        options={
          {
            // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }
        }
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewImageScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
}

class App extends Component {
  state = {xyz: 'xyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxz'};
  updatePhotoArray = () => {
    console.log('updatePhotoArray called');
  };
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;
