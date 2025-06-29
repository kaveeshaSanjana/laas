import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { InstituteModule } from './modules/institute/institute.module';
import { UsersModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [
          __dirname + '/entities/*.entity{.ts,.js}',
          __dirname + '/modules/institute/entities/*.entity{.ts,.js}'
        ],
        synchronize: true, // Set to false in production!
      }),
    }),
    AuthModule,
    TypeOrmModule.forFeature([UserEntity]),
    InstituteModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
