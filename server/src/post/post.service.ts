import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async getPostById(id: number) {
    try {
      const foundPost = await this.postRepository
        .createQueryBuilder('post')
        .where('post.id = :id', { id }) // 매개변수로 받은 id를 조건식으로 넘겨줌.
        .getOne(); // 데이터를 한 개만 가져옴.

      if (!foundPost) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      return foundPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 불러오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async deletePost(id: number) {
    try {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .delete()
        .from(Post)
        .where('id = :id', { id })
        .execute(); // 해당 작업(삭제)을 실행함.

      if (result.affected === 0) {
        // 삭제된 레코드가 없을 경우,
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }

      return id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async updatePost(
    id: number,
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
  ) {
    const post = await this.getPostById(id);

    const { title, description, color, date, score, imageUris } = updatePostDto;

    post.title = title;
    post.description = description;
    post.color = color;
    post.date = date;
    post.score = score;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 수정하는 도중 에러가 발생했습니다.',
      );
    }
    return post;
  }

  async getAllMarkers() {
    try {
      const markers = await this.postRepository
        .createQueryBuilder('post')
        .select([
          // 해당 컬럼의 값들만 선택하여 가져옴.
          'post.id',
          'post.latitude',
          'post.longitude',
          'post.color',
          'post.score',
        ])
        .getMany();

      return markers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '마커를 불러오는 도중 에러가 발생했습니다.',
      );
    }
  }
}
