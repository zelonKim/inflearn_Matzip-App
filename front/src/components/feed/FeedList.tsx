import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FeedItem from './FeedItem';

function FeedList({}) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  // useInfiniteQuery()훅은 다음 페이지를 가져오는 fetchNextPage()함수를 반환함.
  // & 다음 페이지가 있는지 여부를 알려주는 hasNextPage값을 반환함.
  // & 다음 페이지를 가져오고 있는 상태인지 여부를 알려주는 isFetchingNextPage값을 반환함.
  // & 해당 쿼리를 직접 다시 실행하는 refetch()함수를 반환함.

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
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedList;
