import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null, // 이동할 위치
  setMoveLocation: (moveLocation: LatLng) => {
    // 이동할 위치를 변경함.
    set({moveLocation});
  },
}));

export default useLocationStore;
