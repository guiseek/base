import { Module } from '@nestjs/common';
import { ServerUserController } from './server-user.controller';
import { ServerUserService } from './server-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ServerUserController],
  providers: [ServerUserService],
  exports: [ServerUserService],
})
export class ServerUserModule {}
