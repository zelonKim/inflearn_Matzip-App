import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  postLogin,
  postSignup,
} from '../../api/auth';
import {UseMutationCustomOptions} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';


function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup, // 리액트 쿼리 버전5에서는 객체내의 mutationFn속성에 뮤테이션 함수를 지정해야함.
    // onError: (error) => error.response.data.message // 요청 실패 시, 콜백함수의 매개변수에 에러객체가 담김.
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      // 요청 성공 시, 콜백함수의 매개변수에 리턴 데이터가 담김.
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      // 요청 성공과 실패에 상관없이 콜백함수가 실행됨.
      queryClient.refetchQueries({
        // 쿼리키를 통해 데이터를 다시 페치해옴.
        queryKey: ['auth', 'getAccessToken'],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryFn: getAccessToken, // queryFn속성에 쿼리함수를 지정함.
    queryKey: ['auth', 'getAccessToken'], // queryKey속성에 쿼리키를 지정함.
    staleTime: 1000 * 60 * 27,
    refetchInterval: 1000 * 60 * 27,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      // 요청 성공 시,
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // 요청 실패 시,
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}
