import {getCalendarPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions,
) {
  return useQuery({
    queryFn: () => getCalendarPost(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData, // 새로운 데이터를 가져오는 동안 이전의 데이터를 유지함. (UX를 개선해줌.)
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
