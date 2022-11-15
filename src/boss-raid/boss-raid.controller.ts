import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { EndRaidDto } from './dto/endRaid.request.dto';
import { EnterRaidDto } from './dto/enterRaid.request.dto';

@Controller('bossRaid')
export class BossRaidController {
  constructor(private readonly bossRaidService: BossRaidService) {}

  @Get()
  async getRaidStatus(@Res() res) {
    const result = await this.bossRaidService.getRaidStatus();
    res.status(200).json({ result });
  }

  @Post('enter')
  async enterRaid(@Body() data: EnterRaidDto, @Res() res) {
    const result = await this.bossRaidService.enterRaid(data);
    res.status(201).json({ result });
  }

  @Patch('end')
  async endRaid(@Body() data: EndRaidDto, @Res() res) {
    await this.bossRaidService.endRaid(data);
    res.status(204).send();
  }

  @Get('topRankerList')
  async getRanking(@Body('userId') userId: number, @Res() res) {
    const result = await this.bossRaidService.getRanking(userId);
    res.status(200).json({ result });
  }
}
