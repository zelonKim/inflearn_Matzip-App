import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';

function FeedFavoriteList({}) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={posts?.pages.flat()} // flat(): 배열의 깊이를 한 단계 평탄화시킴.
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached} // 스크롤이 마지막에 닿았을때 해당 함수를 호출함.
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
