import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: () => ({
        config: {
          accessKeyId: 'minio',
          secretAccessKey: 'password',
          endpoint: 'http://localhost:9000',
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
  ],
  controllers: [MetadataController],
  providers: [MetadataService]
})
export class MetadataModule {}
