import { Test, TestingModule } from '@nestjs/testing';
import { InstitutesService } from './institute.service';

describe('InstituteService', () => {
  let service: InstitutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutesService],
    }).compile();

    service = module.get<InstitutesService>(InstitutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
