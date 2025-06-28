import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
// import { UserProfile } from './profiles/user.profile';
// import { StudentProfile } from './profiles/student.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [],
  exports: [AutomapperModule],
})
export class MapperModule {}
