import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

// 컨트롤러: 요청을 처리하고, 응답을 리턴함.

@Controller()
export class PostController {
  constructor(private postService: PostService) {
    // 서비스를 주입시켜 사용함.
  }

  @Get('/posts') // http://localhost:3030/posts
  getPosts(@Query('page') page: number) {
    // 페이지 위치를 받아옴.
    return this.postService.getPosts(page);
  }

  @Post('/posts')
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto) {
    // DTO (Data Transfer Object): 데이터 전송을 정의하는 객체
    return this.postService.createPost(createPostDto);
  }

  @Get('/posts/:id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    // 파이프를 통해 원하는 타입으로 변환해줌.
    return this.postService.getPostById(id);
  }

  @Delete('/posts/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Patch('/posts/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
  ) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get('/markers')
  getAllMarkers() {
    return this.postService.getAllMarkers();
  }
}
