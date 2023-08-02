import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  salt: string;
}
