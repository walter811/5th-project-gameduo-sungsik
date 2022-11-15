import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/entities/history.entity';
import { User } from 'src/entities/user.entity';
import { BossRaidController } from './boss-raid.controller';
import { BossRaidService } from './boss-raid.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, History]),
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
      isGlobal: true,
      ttl: 180,
    }),
    HttpModule,
  ],
  controllers: [BossRaidController],
  providers: [BossRaidService, UserService],
})
export class BossRaidModule {}
