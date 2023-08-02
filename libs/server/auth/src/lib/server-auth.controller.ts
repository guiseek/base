import {
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Controller,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserResponseDto } from '@base/server/user';
import { plainToInstance } from 'class-transformer';
import { ServerAuthService } from './server-auth.service';
import { JwtAuthGuard } from './guards';
import { AuthUser } from './interfaces';
import { Public, User } from './decorators';
import { CheckUserDto, SignInDto } from './dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class ServerAuthController {
  constructor(private readonly serverAuthService: ServerAuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Credential accepted',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credential unauthorized',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.serverAuthService.validateUser(signInDto);
  }

  @Public()
  @Post('check')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Username accepted',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Username conflicted',
  })
  async checkUsername(@Body() { username }: CheckUserDto) {
    const user = await this.serverAuthService.checkUser({ username });
    if (user) return { username: 'Username already exists' };
    return;
  }

  @Public()
  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  async register(@Body() user: CreateUserDto) {
    return this.serverAuthService
      .createUser(user)
      .then((user) => plainToInstance(UserResponseDto, user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Credential accepted',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credential unauthorized',
  })
  getProfile(@User() user: AuthUser) {
    return user;
  }
}
