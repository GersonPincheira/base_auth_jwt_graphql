import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    return this.authService.login(req.user as User);
  }
}
