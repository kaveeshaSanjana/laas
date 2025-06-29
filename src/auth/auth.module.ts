import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-hardcoded-secret-key', // In production, use environment variables
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
