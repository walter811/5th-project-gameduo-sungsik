import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { lastValueFrom, map } from 'rxjs';
import { History } from 'src/entities/history.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource, Repository } from 'typeorm';
import { EndRaidDto } from './dto/endRaid.request.dto';
import { EnterRaidDto } from './dto/enterRaid.request.dto';

@Injectable()
export class BossRaidService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userServce: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async getRaidInfo() {
    const url =
      'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json';
    const header = { headers: { 'Content-Type': 'application/json' } };
    const responseData = await lastValueFrom(
      this.httpService.get(url, header).pipe(map((response) => response.data)),
    );

    return responseData;
  }

  async getHistory(raidRecordId) {
    const result = await this.historyRepository.findOne({
      where: { raidRecordId: raidRecordId },
    });
    return result;
  }

  async getRaidStatus() {
    const user = await this.cacheManager.get('enteredUserId');
    if (user) {
      const result = { canEnter: false, enteredUserId: user };
      return result;
    } else {
      const result = { canEnter: true, enteredUserId: user };
      return result;
    }
  }

  async enterRaid(data: EnterRaidDto) {
    const now = new Date();
    const { bossRaids } = await this.getRaidInfo();
    const { levels } = bossRaids[0];
    const level = levels.map((data) => data.level);
    const check = level.find((element) => element === data.level);
    if (check === undefined) {
      throw new NotFoundException();
    }
    const user = await this.userServce.getUser(data.userId);
    if (!user) {
      throw new NotFoundException();
    }
    const enterStatus = await this.cacheManager.get('enteredUserId');
    if (enterStatus) {
      const result = { isEntered: false };
      return result;
    }
    await this.cacheManager.set('enteredUserId', data.userId);
    await this.historyRepository.query(
      `INSERT INTO history(
        level,
        enterTime,
        userId
      ) VALUES (?, ?, ?)
      `,
      [data.level, now, data.userId],
    );

    const result = { isEntered: true, raidRecordId: data.userId };
    return result;
  }

  async endRaid(data: EndRaidDto) {
    const { bossRaids } = await this.getRaidInfo();
    const { levels } = bossRaids[0];
    const score = levels.map((element) => element.score);
    const record = await this.getHistory(data.raidRecordId);
    if (record.user.id === data.userId) {
      throw new NotFoundException();
    }
    const now = new Date();
    const enterTime = record.enterTime;
    const expectEndTime = new Date(
      enterTime.setMinutes(enterTime.getMinutes() + 3),
    );
    if (expectEndTime < now) {
      throw new BadRequestException();
    }
    const enteredUser = await this.cacheManager.get('enteredUserId');
    if (enteredUser) {
      await this.cacheManager.del('enteredUserId');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.historyRepository
        .createQueryBuilder()
        .update(History)
        .set({ endTime: now, score: score[record.level] });

      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ totalScore: () => `totalScore + ${score[record.level]}` })
        .where('id = :id', { id: data.userId });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getRanking(userId: number) {
    const totalRanking = await this.userRepository
      .createQueryBuilder('user')
      .select(['id', 'totalScore'])
      .addSelect('ROW_NUMBER() OVER (ORDER BY "totalScore" DESC) as "ranking"')
      .getRawMany();

    console.log(totalRanking);
    const rankArray = totalRanking.map((element) => element.id);
    const myRanking = rankArray.indexOf(userId);
    const myRankingInfo = totalRanking[myRanking];
    const result = {
      topRankingInfoList: totalRanking,
      myRankingInfo: myRankingInfo,
    };
    return result;
  }
}
