import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class UserSeed {
  constructor(private readonly userService: UsersService) {}

  @Command({ command: 'create:user', describe: 'create a user' })
  async create() {
    const user = await this.userService.create({
      email: 'soporte@innovaxxion.com',
      password: 'innova2k',
      role: 'admin',
    });
    console.log(user);
  }
}
