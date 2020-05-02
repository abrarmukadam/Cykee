// import {createStackNavigator, createAppContainer} from 'react-navigation-stack';

import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionSpecs} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

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
import {default as HideCaption} from './components/SubComponents/HideCaption/HideCaption.container';
import EmptyScreen from './components/screens/EmptyScreen/EmptyScreen';
import {
  FavouriteIcon,
  NavigationCameraButton,
} from './components/SubComponents/Buttons/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native';
import {TouchableOpacity, View, Dimensions} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

function GalleryTab(navigation) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'GridViewScreen') {
            iconName = focused ? 'crop-free' : 'crop-free';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'FavoriteScreen') {
            return <FavouriteIcon fav_status={focused} iconColor={color} />;
          } else if (route.name === 'CameraRollScreen') {
            return <Icon name="grid" type="material-community" color={color} />;
          }
          // return <GalleryIcon selectedStatus={focused} iconColor={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#c0ff02',
        inactiveTintColor: 'gray',
      }}>
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

      <Tab.Screen
        name="GodKnows"
        component={EmptyScreen}
        options={{
          title: '',
          showLabel: false,
          gestureEnabled: false,

          tabBarIcon: ({focused, color, size}) => {
            return <NavigationCameraButton />;
          },
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
        animationEnabled: true,
      }}>
      <Stack.Screen
        name="Home"
        headerMode="none"
        component={CameraScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewImageScreen}
        options={{
          title: 'Preview',
          headerTransparent: true,
          headerTintColor: 'white',
          headerStyle: {
            elevation: 100,
            borderRadius: 0,
          },
          // animationEnabled: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={({navigation, route}) => ({
          title: '',
          // headerTransparent: true,
          statusBar: {
            drawBehind: true,
            visible: false,
          },
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.push('GalleryTab')}
          //     style={{
          //       flex: 4,
          //       paddingRight: 10,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //     }}>
          //     <GalleryIcon iconColor="black" />
          //   </TouchableOpacity>
          // ),
          headerShown: false,
          gestureEnabled: false,
          // gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="GalleryTab"
        component={GalleryTab}
        options={{
          title: 'Gallery',
          headerShown: true,

          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
          headerRight: () => (
            <View>
              <HideCaption />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          title: 'Edit Image',
          // headerTransparent: true,
          headerTintColor: 'black',
          headerStyle: {
            elevation: 100,
            borderRadius: 0,
          },
          gestureEnabled: false,
          // gestureDirection: 'vertical',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
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
