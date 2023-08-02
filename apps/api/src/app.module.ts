import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerAuthModule } from '@base/server/auth';
import { ServerConfigModule } from '@base/server/config';
import { ServerStoreModule } from '@base/server/store';

@Module({
  imports: [
    ServerConfigModule,
    MongooseModule.forRoot('mongodb://localhost/base'),
    ServerAuthModule,
    ServerStoreModule,
  ],
})
export class AppModule {}
