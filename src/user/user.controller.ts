import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() res) {
    const user = await this.userService.createUser();
    res.status(201).json({ userId: user });
  }

  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number, @Res() res) {
    const result = await this.userService.getUser(userId);
    res
      .status(200)
      .json({ totalScore: result.totalScore, bossRaidHistory: result.history });
  }
}
