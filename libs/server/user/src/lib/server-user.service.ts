import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class ServerUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findOneBy<K extends keyof User>(key: K, value: User[K]) {
    return this.userModel.findOne({ [key]: value });
  }

  async createOne(createUserDto: CreateUserDto) {
    const user = this.userModel.create(createUserDto);
    return user.then((user) => user.toJSON());
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async removeOne(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
