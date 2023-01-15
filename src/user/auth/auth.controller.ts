import {
  GenerateProductKeyDTO,
  SigninDTO,
  SignupDTO,
} from 'src/user/dto/auth.dto';
import {
  Body,
  Controller,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*************************************************************************
   * @Describtion     Register A New Member
   * @Route           POST /auth/signup/:userType
   * @Access          Public
   */
  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDTO,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }

    return await this.authService.signup(body, userType);
  }

  /*************************************************************************
   * @Describtion     Login
   * @Route           POST /auth/signin
   * @Access          Public
   */
  @Post('/signin')
  async signin(@Body() body: SigninDTO) {
    return await this.authService.signin(body);
  }

  /*************************************************************************
   * @Describtion     Get The Product Key
   * @Route           GET /auth/key
   * @Access          Public
   */
  @Post('/key')
  async generateProductKey(@Body() { email, userType }: GenerateProductKeyDTO) {
    return await this.authService.generateProductKey(email, userType);
  }
}
