import {getPost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {useSuspenseQuery} from '@tanstack/react-query';

function useGetPost(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useSuspenseQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
