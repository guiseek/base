import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ServerUserService } from './server-user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class ServerUserController {
  constructor(private readonly userService: ServerUserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  postOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOne(createUserDto);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  putOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  deleteOne(@Param('id') id: string) {
    return this.userService.removeOne(id);
  }
}
