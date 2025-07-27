import {storageKeys} from '@/constants';
import useLegendStore from '@/store/useLegendStore';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {useEffect} from 'react';

function useLegendStorage() {
  const {isVisible, setIsVisible} = useLegendStore();

  const set = async (flag: boolean) => {
    await setEncryptStorage('storageKeys', flag);
    setIsVisible(flag);
  };

  useEffect(() => {
    (async () => {
      const storedData = (await getEncryptStorage('ShowLegend')) ?? false;
      setIsVisible(storedData);
    })();
  }, [setIsVisible]);

  return {set, isVisible};
}

export default useLegendStorage;
