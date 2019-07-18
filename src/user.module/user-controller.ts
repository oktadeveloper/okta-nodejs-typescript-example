import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiModelProperty, ApiResponse } from '@nestjs/swagger';

import { IsAuthenticatedGuard } from '../auth.module/is-authenticated-guard';
import { getUserById, ISession, register, sessionLogin } from '../auth.module/okta-client';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Request } from 'express';

export class User {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;
}

export class UserRegisterDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  lastName: string;
}

@Controller('users')
export default class UserController {
  @ApiBearerAuth()
  @ApiResponse({ type: User, status: 200 })
  @UseGuards(IsAuthenticatedGuard)
  @Get('/me')
  async me(@Req() request): Promise<User> {
    const { userId } = request.auth as ISession;
    return await getUserById(userId);
  }

  @ApiResponse({ type: User, status: 201 })
  @Post()
  async create(@Body() userData: UserRegisterDto, @Req() request: Request): Promise<User> {
    const { email, password, firstName, lastName } = userData;
    const { id } = await register({ email, password, firstName, lastName });
    const { sessionId } = await sessionLogin({ email, password });
    request.res.cookie('sessionId', sessionId);

    return { id, email, firstName, lastName };
  }

  @ApiResponse({ type: User, status: 200 })
  @Get(':id')
  async find(@Param('id') id: string): Promise<User> {
    try {
      const user = await getUserById(id);
      return user;
    } catch (e) {
      console.error('could not find user', id, e);
      throw new NotFoundException('No such user');
    }
  }
}
