import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInput } from 'src/users/inputs/user.input';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email:string, password: string): Promise<User | undefined> {
    const userInput = new UserInput
    userInput.email = email
    userInput.password
    const user = await this.usersService.getUser(userInput);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return undefined;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      role: user.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = this.usersService.getUser(decoded);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
