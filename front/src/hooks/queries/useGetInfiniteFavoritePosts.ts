import {getFavoritePosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

const useGetInfiniteFavoritePosts = (
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getFavoritePosts(pageParam),
    queryKey: [
      queryKeys.POST,
      queryKeys.FAVORITE,
      queryKeys.GET_FAVORITE_POSTS,
    ],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};

export default useGetInfiniteFavoritePosts;
