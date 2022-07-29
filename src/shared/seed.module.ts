import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';

import { UserSeed } from '../users/seeds/user.seed';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserSeed, UsersService],
  exports: [UserSeed],
})
export class SeedsModule {}
