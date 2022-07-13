import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field({nullable: true})
  password: string;

  @IsEnum(Role!)
  @Field({nullable: true})
  role: String;
}
