import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 사용자정의 데코레이터
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
