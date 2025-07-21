import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import {mapNavigations} from '../../constants/navigations';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import {LatLng} from 'react-native-maps';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
  [mapNavigations.SEARCH_LOCATION]: undefined;
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
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          presentation: 'modal', // 페이지 자체를 모달처럼 열고 닫을 수 있도록 해줌.
          headerTitle: '장소 검색',
        }}
      />
      <Stack.Screen name={mapNavigations.MAP_HOME} component={MapHomeScreen} />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
