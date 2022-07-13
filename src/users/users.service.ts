import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { UserInput } from './inputs/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(userInput: UserInput): Promise<User> {
    return await this.userModel.findOne({ email: userInput.email });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async create(userInput: UserInput): Promise<User> {
    const bcryptPass = await bcrypt.hash(userInput.password, 10);
    userInput.password = bcryptPass;
    // if (userInput.role) {
    //   userInput.role = userInput.role.toLowerCase();
    //   if userInput.role 
    // }
    const user = new this.userModel(userInput);
    return await user.save();
  }
}
