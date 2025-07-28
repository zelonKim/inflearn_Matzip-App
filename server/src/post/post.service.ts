import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

// 서비스: 각 컨트롤러의 메서드에 해당하는 DB 로직을 구현함.
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) // 해당 엔티티를 가진 레포지토리를 주입함.
    private postRepository: Repository<Post>,
  ) {}

  async getPosts(page: number) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    // 레포지토리.createQueryBuilder('테이블명'): 해당 테이블에서 데이터를 가져옴.
    return this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.date', 'DESC')
      .take(perPage) // 페이지 당 개수
      .skip(offset) // 건너뛸 페이지 개수
      .getMany(); // 여러 개를 가져옴.
  }


  
  async createPost(createPostDto: CreatePostDto) {
    const [
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
      imageUris,
    ] = createPostDto;

    const post = this.postRepository.create({
      // 레포지토리.create(): 해당 테이블의 데이터를 생성함.
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
      imageUris,
    });

    try {
      await this.postRepository.save(post); // 레포지토리.save(데이터): 데이터를 실제 DB에 저장함.
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하는 도중 에러가 발생했습니다.',
      );
    }

    return post;
  }
}
