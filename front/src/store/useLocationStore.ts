import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  setSelectLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({...state, moveLocation})); // ...state를 통해 기존의 다른 상태들을 유지함.
  },
  setSelectLocation: (selectLocation: LatLng) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
