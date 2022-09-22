import {dirname} from 'path';
import { Injectable } from '@nestjs/common';
import csv from 'csvtojson';

@Injectable()
export class MetadataService {
  async parseMetadata(name: string): Promise<string> {
    const filepath = `${dirname(dirname(dirname(__filename)))}/metadata/${name}.csv`
    const records = await csv().fromFile(filepath)
    console.log(JSON.stringify(records));
    return `${dirname(dirname(dirname(__filename)))}/metadata/${name}.csv`;
  }
  /*
  findAll() {
    return `This action returns all metadata`;
  }
  */
  findOne(id: number) {
    return `This action returns a #${id} metadatum`;
  }
}
