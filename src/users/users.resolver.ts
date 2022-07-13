import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enums/roles.enum';
import { UserDto } from './dto/users.dto';
import { UserInput } from './inputs/user.input';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService){}


  @Query(() => [UserDto!])
  @Roles(Role.Admin,Role.Read)
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => UserDto)
  @Roles(Role.Admin)
  async createUser(@Args('input') input: UserInput){
    return await this.usersService.create(input)
  }
}
