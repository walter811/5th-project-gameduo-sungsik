import { IsNotEmpty, IsNumber } from 'class-validator';

export class EndRaidDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsNumber()
  @IsNotEmpty()
  public raidRecordId: number;
}
