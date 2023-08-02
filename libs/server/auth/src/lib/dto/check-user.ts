import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  username: string;
}
