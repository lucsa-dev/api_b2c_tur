import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UserEntity } from '../users/entities/user.entity';
import { UnauthorizedError } from '../common/errors/types/UnauthorizedError';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: [...user.role],
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.findOneWithPassword(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...details } = user;
      if (isPasswordValid) {
        return details;
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
