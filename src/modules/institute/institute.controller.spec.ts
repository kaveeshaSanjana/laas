import { Test, TestingModule } from '@nestjs/testing';
import { InstitutesController } from './institute.controller';
import { InstitutesService } from './institute.service';

describe('InstituteController', () => {
  let controller: InstitutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutesController],
      providers: [InstitutesService],
    }).compile();

    controller = module.get<InstitutesController>(InstitutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
