import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });

  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComback} = useAppState();

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      info => {
        // 첫번째 인수 -> 성공 시 실행될 콜백함수 (매개변수에 위치정보 객체가 담김.)
        const {latitude, longitude} = info.coords; // 위치정보 객체.coords: 현재 위치의 좌표값을 가져옴.
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        // 두번째 인수 -> 에러 발생 시, 실행될 콜백함수
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true, // 세번째 인수 -> 옵션
      },
    );
  }, []);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
