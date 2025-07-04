import React, {  useRef } from 'react';
import {StyleSheet, View, Text, Button, Pressable} from 'react-native';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';


type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;


const MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const mapRef = useRef<MapView | null>(null);

  const {userLocation, isUserLocationError} = useUserLocation()


const handlePressUserLocation = () => {
  if(isUserLocationError) {
    return
  }
  mapRef.current?.animateToRegion({ // 지도를 해당 좌표로 이동시킴.
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    longitudeDelta: 0.0421, // 확대 정도
    latitudeDelta: 0.0922
  })
}

  return (
    <>
       <MapView 
        ref={mapRef}
        style={styles.container} 
        provider={PROVIDER_GOOGLE} 
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        />

        <Pressable style={[styles.drawerButton, {top: inset.top || 20}]} 
            onPress={ () => navigation.openDrawer()}>
          <Text>서랍</Text>
        </Pressable>
        
        <View style={styles.buttonList}>
          <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
            <Text>내 위치</Text>
          </Pressable>
        </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  }
});

export default MapHomeScreen;