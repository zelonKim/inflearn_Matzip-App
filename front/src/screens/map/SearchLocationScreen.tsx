import SearchInput from '@/components/common/SearchInput';
import useSearchLocation from '@/hooks/queries/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import SearchRegionResult from './SearchRegionResult';

function SearchLocationScreen({}) {
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();

  const {regionInfo} = useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placehoder="검색할 장소를 입력하세요"
        onSubmit={() => Keyboard.dismiss()} // 검색을 완료했을때 화면 하단의 키보드를 닫아줌.
      />
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
