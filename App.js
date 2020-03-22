import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {CameraScreen, PreviewImageScreen} from './components/index';

// function Home({navigation}) {
//   return <CameraScreen navigation={navigation} />;
// }
// function Preview({navigation}) {
//   return <PreviewImageScreen navigation={navigation} />;
// }
// const RootStack = createStackNavigator(
//   {
//     Home: {screen: CameraScreen},
//     PreviewScreen: {screen: PreviewImageScreen},
//   },
//   {
//     initialRouteName: 'Home',
//     headerMode: 'none',
//   },
// );
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
            // title: 'Awesome app',
          }
        }
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewImageScreen}
        options={
          {
            // title: 'PreviewScreen',
          }
        }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
