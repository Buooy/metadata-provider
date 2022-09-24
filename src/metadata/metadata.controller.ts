import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { NotFoundException } from '@nestjs/common';

@Controller('json')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get(':subject')
  async findAll(@Param('subject') subject: string): Promise<Record<any, any>[]> {
    const records = await this.metadataService.findAll(subject);

    if (records === undefined) throw new NotFoundException();
    return records;
  }

  @Get(':subject/:id')
  async findOne(@Param('subject') subject: string, @Param('id') id: string): Promise<Record<any, any>> {
    const record = await this.metadataService.findOne(subject, id);

    if (record === undefined) throw new NotFoundException();
    return record;
  }
}
