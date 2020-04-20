// import {createStackNavigator, createAppContainer} from 'react-navigation-stack';

import * as React from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Component} from 'react';
import {store, persistor} from './redux-store';

import {default as CameraScreen} from './components/screens/CameraScreen/CameraScreen.container';
import {default as PreviewImageScreen} from './components/screens/PreviewImageScreen/PreviewImageScreen.container';
import {default as GalleryScreen} from './components/screens/GalleryScreen/GalleryScreen.container';
import {default as GridViewScreen} from './components/screens/GridViewScreen/GridViewScreen.container';
import {default as EditScreen} from './components/screens/EditScreen/EditScreen.container';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();

function MyStack(navigation) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen
        name="Home"
        headerMode="none"
        component={CameraScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewImageScreen}
        options={{
          title: 'Preview',
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={({navigation, route}) => ({
          title: '',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        })}
      />
      <Stack.Screen
        name="GridViewScreen"
        component={GridViewScreen}
        options={{
          title: 'Cykeee Gallery',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        headerMode="none"
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
}

class App extends Component {
  render() {
    console.log('starting app');
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
