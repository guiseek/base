import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ServerUserService, CreateUserDto, User } from '@base/server/user';
import { ServerConfigService } from '@base/server/config';
import { JwtService } from '@nestjs/jwt';
import { validatePassword, createPassword } from '@base/server/util';
import { uuid } from '@base/shared/util';
import { InjectModel } from '@nestjs/mongoose';
import { SignInDto, CheckUserDto } from './dto';
import { RefreshToken } from './schemas';
import { Request } from 'express';
import { Model } from 'mongoose';
import Cryptr from 'cryptr';
import { AuthUser } from './interfaces/auth-user';

function repl<T extends string>(value: T, search: string, replace: string) {
  return value.replace(search, replace);
}

@Injectable()
export class ServerAuthService {
  private cryptr;

  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private userRepository: ServerUserService,
    private configService: ServerConfigService,
    private jwtService: JwtService
  ) {
    this.cryptr = new Cryptr(this.configService.jwt.encryptJwtSecret);
  }

  async createAccessToken(userId: string) {
    return this.encryptText(this.sign(userId));
  }

  private sign(userId: string) {
    return this.jwtService.sign({ userId }, this.configService.jwt);
  }

  async createRefreshToken(req: Request, userId: string) {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: uuid(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this.refreshTokenModel.findOne({
      refreshToken: token,
    });
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async validateUser({ username, password }: SignInDto) {
    const user = await this.userRepository.findOneBy('username', username);

    if (user && (await validatePassword(password, user.password))) {
      return this.login(user.toJSON());
    }

    throw new UnauthorizedException();
  }

  async checkUser(user: CheckUserDto) {
    return this.userRepository.findOneBy('username', user.username);
  }

  async createUser(user: CreateUserDto) {
    const { password, salt } = await createPassword(user.password);
    return this.userRepository.createOne({ ...user, password, salt });
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private getIp(req: Request) {
    return req.ip;
  }

  private getBrowserInfo(req: Request) {
    return req.header('user-agent') || 'XX';
  }

  private getCountry(req: Request) {
    const country = req.header('cf-ipcountry');
    return country ? country : 'XX';
  }

  private encryptText(text: string) {
    return this.cryptr.encrypt(text);
  }
}
