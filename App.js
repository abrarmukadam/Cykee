// import {createStackNavigator, createAppContainer} from 'react-navigation-stack';

import * as React from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Component} from 'react';
import {store, persistor} from './redux-store';

import {default as CameraScreen} from './components/screens/CameraScreen/CameraScreen.container';
import {default as PreviewImageScreen} from './components/screens/PreviewImageScreen/PreviewImageScreen.container';
import {default as GalleryScreen} from './components/screens/GalleryScreen/GalleryScreen.container';
import {default as GridViewScreen} from './components/screens/GridViewScreen/GridViewScreen.container';
import {default as EditScreen} from './components/screens/EditScreen/EditScreen.container';
import {default as FavoriteScreen} from './components/screens/FavoriteScreen/FavoriteScreen.container';
import {default as CameraRollScreen} from './components/screens/CameraRollScreen/CameraRollScreen';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function GalleryTab(navigation) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="GridViewScreen"
        component={GridViewScreen}
        options={{
          title: 'Cykee',
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          title: 'Favorite',
        }}
      />
      <Tab.Screen
        name="CameraRollScreen"
        component={CameraRollScreen}
        options={{
          title: 'Camera Roll',
        }}
      />
    </Tab.Navigator>
  );
}

function CameraStack(navigation) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // headerMode="none"
      options={{
        statusBar: {
          drawBehind: true,
          visible: false,
        },

        headerTintColor: 'red',
      }}
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
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{
          title: '',
          // headerTransparent: true,
          statusBar: {
            drawBehind: true,
            visible: false,
          },

          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="GalleryTab"
        component={GalleryTab}
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
            <CameraStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
