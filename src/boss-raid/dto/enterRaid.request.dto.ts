import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnterRaidDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsNumber()
  @IsNotEmpty()
  public level: number;
}
