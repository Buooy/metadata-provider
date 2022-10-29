import { Injectable, Logger } from '@nestjs/common';
import csv from 'csvtojson';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';

type MetadataRecord = Record<any, any>;

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  constructor(@InjectS3() private readonly s3: S3) {}

  async parseMetadata(subject: string): Promise<MetadataRecord[]> {
    try {
      const readStream = this.s3
        .getObject({
          Bucket: String(process.env.S3_BUCKET),
          Key: `${subject}.csv`,
        })
        .createReadStream();

      const records = await csv().fromStream(readStream);

      return records;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async findAll(subject: string): Promise<MetadataRecord[] | undefined> {
    const records = await this.parseMetadata(subject);
    return records;
  }

  async findOne(
    subject: string,
    id: number | string,
  ): Promise<MetadataRecord | undefined> {
    const records = await this.parseMetadata(subject);
    const record = records.find((row) => row.id === id);

    return record;
  }

  async generateJson(
    subject: string,
    records: MetadataRecord[],
    recordPrefix = '',
    recordSuffix = '',
  ) {
    for (const record of records) {
      await this.storeInObjectStorage(
        subject,
        record,
        recordPrefix,
        recordSuffix,
      );
    }
  }

  async storeInObjectStorage(
    subject: string,
    record: MetadataRecord,
    recordPrefix = '',
    recordSuffix = '',
  ) {
    const buf = Buffer.from(JSON.stringify(record));

    const data = {
      Bucket: String(process.env.S3_JSON_BUCKET),
      Key: `${subject}/${recordPrefix}${record.id}${recordSuffix}.json`,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'application/json',
    };

    try {
      const result = await this.s3.upload(data).promise();
      this.logger.log(result);
    } catch (error) {
      this.logger.error(error);
      this.logger.error('Error uploading data: ', data);
    }
  }
}
