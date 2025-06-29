// src/modules/institute/institute.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutesService } from './institute.service';
import { InstitutesController } from './institute.controller';
import { InstituteEntity } from './entities/institute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstituteEntity])],
  controllers: [InstitutesController],
  providers: [InstitutesService],
  exports: [InstitutesService], // Export service if other modules need it
})
export class InstituteModule {}