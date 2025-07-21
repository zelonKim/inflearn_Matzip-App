import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

function useSearchLocation(keyword: string, location: LatLng) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [pageParam, setPageParam] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`, // .env파일에 저장된 API Key를 가져옴.
            },
          },
        );
        setRegionInfo(data.documents);
      } catch (err) {
        setRegionInfo([]);
      }
    })();
  }, [keyword]);

  return {regionInfo};
}

export default useSearchLocation;
