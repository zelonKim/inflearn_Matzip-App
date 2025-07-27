import {getPosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

const useGetInfinitePosts = (
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) => {
  return useSuspenseInfiniteQuery({ // 버전 5에서의 서스펜스
    // 페이징 기능이 추가된 useQuery()훅
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    
    // suspense: true  // 버전 4에서의 서스펜스

    throwOnError: true, // 버전 5에서의 에러 바운더리
    // useErrorBoundary: true  // 버전 4에서의 에러 바운더리
    
    ...queryOptions,
  });
};

export default useGetInfinitePosts;
