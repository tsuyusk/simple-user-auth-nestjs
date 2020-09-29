import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from './entities/user.entity';
import { CreateUserDto } from './interfaces/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async create({ email, name, password }: CreateUserDto): Promise<User> {
    const newUser = this.ormRepository.create({
      email,
      name,
      password,
    });

    await this.ormRepository.save(newUser);

    return newUser;
  }

  async findById(id: string): Promise<User | undefined> {
    const searchedUser = await this.ormRepository.findOne({
      where: { id },
    });

    return searchedUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const searchedUser = await this.ormRepository.findOne({
      where: { email },
    });

    return searchedUser;
  }
}
