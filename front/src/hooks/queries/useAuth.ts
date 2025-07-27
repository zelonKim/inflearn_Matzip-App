import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
  ResponseProfile,
  ResponseToken,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';
import {numbers, queryKeys, storageKeys} from '../../constants';
import {Category, Profile} from '@/types/domain';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup, // 리액트 쿼리 버전5에서는 객체내의 mutationFn속성에 뮤테이션 함수를 지정해야함.
    // onError: (error) => error.response.data.message // 요청 실패 시, 콜백함수의 매개변수에 에러객체가 담김.
    ...mutationOptions,
    throwOnError: error => Number(error.response?.status) >= 500, // 서버 에러일 경우, 캐치되도록 함.
  });
}

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: ({accessToken, refreshToken}) => {
      // 요청 성공 시, 콜백함수의 매개변수에 리턴 데이터가 담김.
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      // 요청 성공과 실패에 상관없이 콜백함수가 실행됨.
      queryClient.refetchQueries({
        // 쿼리키를 통해 데이터를 다시 페치해옴.
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
}

function useGetRefreshToken() {
  const {isSuccess, data, isError, isPending} = useQuery({
    queryFn: getAccessToken, // queryFn속성에 쿼리함수를 지정함.
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN], // queryKey속성에 쿼리키를 지정함.
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      // 요청 성공 시,
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // 요청 실패 시,
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError, isPending};
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useMutateDeleteAccoount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
    ...mutationOptions,
  });
}

type ResponseSelectProfile = {categories: Category} & Profile;

const transformProfileCategory = (
  data: ResponseProfile,
): ResponseSelectProfile => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

  return {categories, ...rest};
};

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useGetProfile(
  queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    select: transformProfileCategory,
    ...queryOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();

  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // 속성값이 true일 경우, 쿼리가 실행됨.
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const deleteAccountMutation = useMutateDeleteAccoount({
    onSuccess: () => logoutMutation.mutate(null),
  });

  const categoryMutation = useMutateCategory();
  const isLoginLoading = refreshTokenQuery.isPending;

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    profileMutation,
    deleteAccountMutation,
    categoryMutation,
  };
}

export default useAuth;
