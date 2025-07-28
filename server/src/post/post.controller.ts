import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

// 컨트롤러: 요청을 처리하고, 응답을 리턴함.

@Controller()
export class PostController {
  constructor(private postService: PostService) {
    // 서비스를 주입시켜 사용함.
  }

  @Get('/posts') // http://localhost:3030/posts
  getPosts(@Query('page') page: number) { // 페이지 위치를 받아옴.
    return this.postService.getPosts(page);
  }

  @Post('/posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    // DTO (Data Transfer Object): 데이터 전송을 정의하는 객체
    return this.postService.createPost(createPostDto);
  }
}
