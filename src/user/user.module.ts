/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './login.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],

    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: 3600,
      },
    }),
  }),
  TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UserService],
  controllers: [UserController,LoginController]
})
export class UserModule {}
