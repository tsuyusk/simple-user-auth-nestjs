import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'nestjs_users_crud',
      entities: [
        join(__dirname, 'modules', '**', 'entities', '*.entity{.ts,.js}'),
      ],
      migrations: [
        join(__dirname, 'shared', 'database', 'migrations', '*{.ts,.js}'),
      ],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
