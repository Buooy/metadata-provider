import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { NotFoundException } from '@nestjs/common';

@Controller('json')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  /*
  @Get()
  findAll() {
    return this.metadataService.findAll();
  }
  */

  @Get(':subject/:id')
  async findOne(@Param('subject') subject: string, @Param('id') id: string): Promise<Record<any, any>> {
    const record = await this.metadataService.findOne(subject, id);

    if (record === undefined) throw new NotFoundException();
    return record;
  }
}
