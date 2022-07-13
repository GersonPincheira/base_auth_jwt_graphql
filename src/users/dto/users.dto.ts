import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

@ObjectType()
export class UserDto {
  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @IsEnum(Role)
  @Field({ nullable: true })
  role: String;
}
