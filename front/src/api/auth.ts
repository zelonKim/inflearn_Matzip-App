import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

type RequestProfile = Omit<
  Profile,
  'id' | 'email' | 'kakaoImgUri' | 'loginType'
>;

const editProfile = async (body: RequestProfile): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.patch('/auth/me', body);
  return data;
};





const deleteAccount = async () => {
  await axiosInstance.delete('/auth/me');
};

const editCategory = async (body: Category): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.patch('/auth/category', body);
  return data;
};





const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});
  return data;
};

type RequestAppleIdentity = {
  identityToken: string;
  appId: string;
  nickname: string | null;
};

const appleLogin = async (
  body: RequestAppleIdentity,
): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/apple', body);
  return data;
};

export {
  postSignup,
  postLogin,
  getProfile,
  getAccessToken,
  logout,
  kakaoLogin,
  appleLogin,
  editProfile,
  deleteAccount,
  editCategory,
};
export type {
  RequestUser,
  ResponseToken,
  ResponseProfile,
  RequestAppleIdentity,
  RequestProfile,
};
