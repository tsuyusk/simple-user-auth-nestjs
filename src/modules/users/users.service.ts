import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import User from './entities/user.entity';
import { CreateUserDto } from './interfaces/create-user.dto';
import { AuthUserDto } from './interfaces/auth-user.dto';
import { UsersRepository } from './users.repository';
import { HashProvider } from '../../shared/providers/hash/hash.provider';
import { authConfig } from 'src/config/auth';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async showProfile({ id }: { id: string }) {
    return this.usersRepository.findById(id);
  }

  async create({ email, name, password }: CreateUserDto): Promise<User> {
    const hasUserWithSameEmail = await this.usersRepository.findByEmail(email);

    if (hasUserWithSameEmail) {
      throw new HttpException('E-mail already taken', 400);
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }

  async authenticate({ email, password }: AuthUserDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid E-mail/Password combination', 400);
    }

    const passwordMatches = await this.hashProvider.verify(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new HttpException('Invalid E-mail/Password combination', 400);
    }

    const { secret } = authConfig.jwt;

    const token = jwt.sign({}, secret, {
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
