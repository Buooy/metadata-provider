import {dirname} from 'path';
import { Injectable } from '@nestjs/common';
import csv from 'csvtojson';

@Injectable()
export class MetadataService {
  async parseMetadata(subject: string): Promise<Record<any, any>[]> {
    try {
      const filepath = `${dirname(dirname(dirname(__filename)))}/uploads/${subject}.csv`;
      const records = await csv().fromFile(filepath);

      return records;
    } catch (error) {
      console.error(error)
      return [];
    }
  }
  /*
  findAll() {
    return `This action returns all metadata`;
  }
  */
  async findOne(subject: string, id: number|string): Promise<Record<any, any>|undefined> {
    const metadata = await this.parseMetadata(subject);
    const record = metadata.find(row => row.id === id);

    return record
  }
}
