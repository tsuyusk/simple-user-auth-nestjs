import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnsureAuthMiddleware } from 'src/shared/middleware/ensureAuth.middleware';

import { HashModule } from '../../shared/providers/hash/hash.module';
import User from './entities/user.entity';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthMiddleware).forRoutes('users/me');
  }
}
