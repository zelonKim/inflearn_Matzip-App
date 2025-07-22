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
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageParam, setPageParam] = useState(1);

  const fetchNextPage = () => {
    setPageParam(prev => prev + 1);
  };

  const fetchPrevPage = () => {
    setPageParam(prev => prev - 1);
  };

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
        setHasNextPage(!data.meta.is_end); // 카카오맵 API 응답 데이터가 마지막인지 여부를 반환함.
        setRegionInfo(data.documents);
      } catch (err) {
        setRegionInfo([]);
      }
    })();
    keyword === '' && setPageParam(1);
  }, [keyword, location, pageParam]);

  return {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage};
}

export default useSearchLocation;
