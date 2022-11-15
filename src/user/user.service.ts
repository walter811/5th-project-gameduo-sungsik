import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(): Promise<any> {
    const now = new Date();
    const result = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ createdAt: now })
      .execute();

    return result.identifiers.map((value) => value.id)[0];
  }

  async getUser(userId: number): Promise<any> {
    const result = await this.userRepository.findOne({
      relations: {
        history: true,
      },
      where: { id: userId },
    });

    return result;
  }
}
