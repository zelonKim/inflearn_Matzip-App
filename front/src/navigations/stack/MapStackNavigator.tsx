import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import {mapNavigations} from '../../constants/navigations';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={LoginScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen name={mapNavigations.MAP_HOME} component={MapHomeScreen} />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
