import { Test, TestingModule } from '@nestjs/testing';
import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  let service: MetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataService],
    }).compile();

    service = module.get<MetadataService>(MetadataService);
  });

  it('should parse csv file properly', async () => {
    console.log(await service.parseMetadata('buooy'))
    expect(typeof (await service.parseMetadata('buooy'))).toBe("string")
  });
});
