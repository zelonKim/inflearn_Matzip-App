import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 쿼리 요청 실패 시, 재요청을 하지 않도록 설정함.
    },
    mutations: {
      retry: false, // 뮤테이션 요청 실패 시, 재요청을 하지 않도록 설정함.
    },
  },
});

export default queryClient;
