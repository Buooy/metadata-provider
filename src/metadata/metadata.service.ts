import {dirname} from 'path';
import { Injectable } from '@nestjs/common';
import csv from 'csvtojson';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';

@Injectable()
export class MetadataService {
  constructor(
    @InjectS3() private readonly s3: S3,
    ) {}

  async parseMetadata(subject: string): Promise<Record<any, any>[]> {
    try {
      const readStream = this.s3.getObject({
        Bucket: String(process.env.S3_BUCKET),
        Key: `${subject}.csv`,
      }).createReadStream()

      const records = await csv().fromStream(readStream);

      return records;
    } catch (error) {
      console.error(error)
      return [];
    }
  }
  
  async findAll(subject: string): Promise<Record<any, any>[]|undefined> {
    const records = await this.parseMetadata(subject);
    return records
  }
  
  async findOne(subject: string, id: number|string): Promise<Record<any, any>|undefined> {
    const records = await this.parseMetadata(subject);
    const record = records.find(row => row.id === id);

    return record
  }
}
