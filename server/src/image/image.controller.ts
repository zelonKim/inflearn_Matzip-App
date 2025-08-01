import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { numbers } from 'src/@common/constants';
import * as fs from 'fs';
import { getUniqueFileName } from 'src/favorite/utils';
import { PutObjectCommand } from '@aws-sdk/client-s3';

try {
  fs.readdirSync('uploads');
} catch (error) {
  fs.mkdirSync('uplaods');
}

@Controller('images')
@UseGuards(AuthGuard())
export class ImageController {
  @UseInterceptors(
    FilesInterceptor('images', numbers.MAX_IMAGE_COUNT, {
      // 로컬 파일 시스템에 저장함.
      //   storage: diskStorage({
      //     destination(req, file, cb) {
      //       cb(null, 'uploads/');
      //     },
      //     filename(req, file, cb) {
      //       const ext = extname(file.originalname);
      //       cb(null, basename(file.originalname, ext) + Date.now() + ext);
      //     },
      //   }),

      limits: { fileSize: numbers.MAX_IMAGE_SIZE },
    }),
  )




  @Post('/')
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const s3Client = newS3Client({
      region: proceess.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const uuid = Date.now();

    const uploadPromises = files.map((file) => {
      const fileName = getUniqueFileName(file, uuid);
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        key: `original/${fileName}`,
        Body: file.buffer,
      };
      const command = new PutObjectCommand(uploadParams);

      return s3Client.send(command);
    });

    await Promise.all(uploadPromises);

    
    const uris = files.map((file) => {
      const fileName = getUniqueFileName(file, uuid);
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/original/${fileName}`;
    });

    return uris;
  }
}
