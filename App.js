// import {createStackNavigator, createAppContainer} from 'react-navigation-stack';

import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators} from '@react-navigation/stack';
// import {TransitionPresets} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Component} from 'react';
import {store, persistor} from './redux-store';

import {default as CameraScreen} from './components/screens/CameraScreen/CameraScreen.container';
import {default as PreviewImageScreen} from './components/screens/PreviewImageScreen/PreviewImageScreen.container';
import {default as GalleryScreen} from './components/screens/GalleryScreen/GalleryScreen.container';
import {default as GridViewScreen} from './components/screens/GridViewScreen/GridViewScreen.container';
import {default as EditScreen} from './components/screens/EditScreen/EditScreen.container';
import {default as FavoriteScreen} from './components/screens/FavoriteScreen/FavoriteScreen.container';
import {default as CameraRollScreen} from './components/screens/CameraRollScreen/CameraRollScreen.container';
import {default as HideCaption} from './components/SubComponents/HideCaption/HideCaption.container';
import EmptyScreen from './components/screens/EmptyScreen/EmptyScreen';
import {
  FavouriteIcon,
  NavigationCameraButton,
  CykeeColor,
  TAB_BAR_COLOR,
  HEADER_TITLE_COLOR,
} from './components/SubComponents/Buttons/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'react-native-elements';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

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
        activeTintColor: CykeeColor,
        inactiveTintColor: 'gray',
        activeBackgroundColor: TAB_BAR_COLOR,
        inactiveBackgroundColor: TAB_BAR_COLOR,
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
const expandingTransition_config = {
  animation: 'timing',
  config: {
    duration: 250, // These are optional, so feel free to modify them as you see fit.
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing,
  },
};

const sharedElementTransition_config = {
  animation: 'timing',
  config: {
    duration: 350, // These are optional, so feel free to modify them as you see fit.
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing,
  },
};
const slidingExitTransition = ({current, next, index, closing, layouts}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return {
    // cardStyle: {
    opacity: opacity,
    // },
  };
};
const sharedElementExitTransition = ({
  current,
  next,
  index,
  closing,
  layouts,
}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 0.95, 1],
    outputRange: [0, 0, 1],
  });
  return {
    cardStyle: {
      opacity: opacity,
    },
  };
};
const sharedElementEntryTransition = ({
  current,
  next,
  index,
  closing,
  layouts,
}) => {
  const height = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [100, 100, 0],
  });
  return {
    cardStyle: {
      transform: [{translateY: height}],
    },
  };
};

const expandingTransition = ({current, next, index, closing, layouts}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const height = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1],
    outputRange: [layouts.screen.height, 0],
  });
  const width = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1],
    outputRange: [-layouts.screen.width, 0],
  });

  return {
    cardStyle: {
      transform: [{translateX: width, translateY: height}],
      opacity: opacity,
    },
  };
};

function CameraStack(navigation) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // mode="modal"
      // headerMode="none"
      options={{
        statusBar: {
          drawBehind: true,
          visible: false,
        },
        // cardStyleInterpolator: forFade,

        headerTintColor: 'red',
      }}
      // screenOptions={{
      //   animationEnabled: false,
      // }}
      //
    >
      <Stack.Screen
        name="Home"
        headerMode="none"
        component={CameraScreen}
        options={{
          headerShown: false,
          // transitionSpec: {
          //   open: expandingTransition,
          //   close: sharedElementExitTransition,
          // },
          // cardStyleInterpolator: expandingTransition,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        // name="GridViewScreen"
        name="GalleryTab"
        component={GalleryTab}
        // component={GridViewScreen}
        options={({navigation, route}) => ({
          title: 'Gallery',
          headerShown: true,
          headerStyle: {backgroundColor: TAB_BAR_COLOR},
          headerTitleStyle: {fontSize: 24, color: HEADER_TITLE_COLOR},
          // gestureEnabled: true,
          // gestureDirection: 'vertical',

          // transitionSpec: {
          //   open: expandingTransition_config,
          //   close: sharedElementTransition_config,
          // },
          // cardStyleInterpolator: expandingTransition,

          // cardStyleInterpolator:
          //   CardStyleInterpolators.forRevealFromBottomAndroid,
          headerRight: () => (
            <View>
              <HideCaption />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewImageScreen}
        options={{
          title: '',

          headerTransparent: true,
          // headerShown: false,
          headerTitleStyle: {fontSize: 24, color: 'white'},
          headerTintColor: 'white',
          headerStyle: {
            elevation: 100,
            borderRadius: 0,
          },
          // animationEnabled: false,
          // cardStyleInterpolator:
          //   CardStyleInterpolators.forFadeFromBottomAndroid,
          // cardStyleInterpolator: forFade,
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
          headerShown: false,
          gestureEnabled: false,

          // gestureDirection: 'vertical',
          transitionSpec: {
            open: sharedElementTransition_config,
            close: expandingTransition_config,
          },
          cardStyleInterpolator: sharedElementExitTransition,
          // cardStyleInterpolator: expandingTransition,

          // ...TransitionPresets.ModalPresentationIOS,
        })}
      />

      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          title: 'Edit',
          // headerTransparent: true,
          headerTintColor: 'black',
          headerStyle: {
            elevation: 100,
            borderRadius: 0,
          },
          headerTitleStyle: {fontSize: 24},

          gestureEnabled: false,
          // gestureDirection: 'vertical',
          // cardStyleInterpolator: forFade,
          // cardStyleInterpolator:
          //   CardStyleInterpolators.forFadeFromBottomAndroid,
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
