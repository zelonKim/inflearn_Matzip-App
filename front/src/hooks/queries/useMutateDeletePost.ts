import {deletePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation} from '@tanstack/react-query';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,

    onSuccess: deletedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALEDAR_POSTS],
      });
    

      // queryClient.setQueryData<Marker[]>(
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   existingMarkers => {
      //     return existingMarkers?.filter(marker => marker.id !== deleteId);
      //   },
      // );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
