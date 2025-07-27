import {Marker} from '@/types/domain';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {useEffect, useState} from 'react';

const initialFilters = {
  RED: true,
  YELLOW: true,
  GREEN: true,
  BLUE: true,
  PURPLE: true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
};

function useMarkerFilter() {
  const [filterItems, setFilterItems] = useState(initialFilters);

  const set = async (items: Record<string, boolean>) => {
    await setEncryptStorage('MarkerFilter', items);
    setFilterItems(items);
  };

  const transformFilteredMarker = (markers: Marker[]) => {
    return markers.filter(marker => {
      return (
        filterItems[marker.color] === true &&
        filterItems[String(marker.score)] === true
      );
    });
  };

  useEffect(() => {
    async () => {
      const storedData =
        (await getEncryptStorage('MarkerFilter')) ?? initialFilters;
      setFilterItems(storedData);
    };
  }, [filterItems]);

  return [set, filterItems, transformFilteredMarker];
}

export default useMarkerFilter;
