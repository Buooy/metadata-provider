import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [MetadataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
