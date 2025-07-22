import React, {  useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, Pressable, Alert} from 'react-native';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Callout, LatLng, LongPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { alerts, colors, mapNavigations, numbers } from '@/constants';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/IonIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';
import MarkerModal from '@/components/map/MarkerModal';
import useLocationStore from '@/store/useLocationStore';


type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const {userLocation, isUserLocationError} = useUserLocation();

  const {selectLocation, setSelectLocation} = useLocationStore();

  
  const {markerId, setMarkerId} = useState<number | null>(null);

  const {data:markers = []} = useGetMarkers();

  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  const markerModal = useModal();

  usePermission('LOCATION');


  const handlePressMarker = (id:number, coordinate:LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  }

  const handleLongPressMapView = ({nativeEvent}:LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate)
  }

  const handlePressAddPost = () => {
    if(!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE, 
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION
      );
    }
    navigation.navigate(mapNavigations.ADD_POST, {location: selectLocation}); // 해당 스크린으로 파라미터 객체를 전달함.

    setSelectLocation(null)
  }


const handlePressUserLocation = () => {
  if(isUserLocationError) {
    Toast.show({
      type: 'error',
      text1: '위치 권한을 허용해주세요.',
      position: 'bottom'
    })
  }
  moveMapView(userLocation);
}

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION)
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
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta}
        region={{...userLocation, 
          ...numbers.INITIAL_DELTA}}
        >
          {markers.map(({id, color, score, ...coordinate}) => (
            <CustomMarker 
              key={id} 
              color={color} 
              score={score} 
              coordinate={coordinate}
              onPress={() => handlePressMarker(id, coordinate)}
              />
          ))}

          {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
          )}

        </MapView>


        <Pressable style={[styles.drawerButton, {top: inset.top || 20}]} 
            onPress={ () => navigation.openDrawer()}>
          <Ionicons name='menu' color={colors.WHITE} size={25} />
        </Pressable>
        
        <View style={styles.buttonList}>
          <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
            <MaterialIcons name="add" color={colors.WHITE} size={25} />
          </Pressable>

          <Pressable style={styles.mapButton} onPress={handlePressSearch}>
            <MaterialIcons name="search" color={colors.WHITE} size={25} />
          </Pressable>

          <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
            <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
          </Pressable>
        </View>

        <MarkerModal markerId={markerId} isVisible={markerModal.isVisible} hide={markerModal.hide}/>
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