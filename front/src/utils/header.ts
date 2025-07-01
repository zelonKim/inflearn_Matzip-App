import axiosInstance from '../api/axios';

function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value; // 디폴트로 요청 헤더를 설정함.
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key]; // 디폴트 요청 헤더를 제거함.
}

export {setHeader, removeHeader};
