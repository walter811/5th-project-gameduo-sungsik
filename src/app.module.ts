import { CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { History } from './entities/history.entity';
import { BossRaidModule } from './boss-raid/boss-raid.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, History],
      charset: 'utf8mb4',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    BossRaidModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
