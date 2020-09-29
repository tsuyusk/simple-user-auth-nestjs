import { Body, Controller, Post, Get, ParseUUIDPipe } from '@nestjs/common';
import { classToClass } from 'class-transformer';

import { AuthUserDto } from './interfaces/auth-user.dto';
import { CreateUserDto } from './interfaces/create-user.dto';
import { UserDecorator } from './user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async showProfile(
    @UserDecorator('id')
    userId: string,
  ) {
    const profile = await this.usersService.showProfile({ id: userId });

    return classToClass(profile);
  }

  @Post()
  async createUser(@Body() { email, name, password }: CreateUserDto) {
    const user = await this.usersService.create({
      email,
      name,
      password,
    });

    return classToClass(user);
  }

  @Post('auth')
  async validateUser(@Body() { email, password }: AuthUserDto) {
    const userAndToken = await this.usersService.authenticate({
      email,
      password,
    });

    return classToClass(userAndToken);
  }
}
