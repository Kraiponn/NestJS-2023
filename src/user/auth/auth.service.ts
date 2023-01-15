import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface ISignupParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface ISigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  /***************************************************
   *                 SIGN UP
   **************************************************/
  async signup(body: ISignupParams, userType: UserType) {
    const { email, password, name, phone } = body;

    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) throw new ConflictException();

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPwd,
        user_type: userType,
      },
    });

    return await this.generateJWT(name, user.id);
  }

  /***************************************************
   *                 SIGN IN
   **************************************************/
  async signin({ email, password }: ISigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new HttpException('Invalid credentials', 400);

    const hashedPwd = user.password;
    const isValidPwd = await bcrypt.compare(password, hashedPwd);

    if (!isValidPwd) throw new HttpException('Invalid credentials', 400);

    return await this.generateJWT(user.name, user.id);
  }

  /***************************************************
   *              Generate the token
   **************************************************/
  private async generateJWT(name: string, id: number) {
    return await await jwt.sign(
      {
        name,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      { expiresIn: 3600000 },
    );
  }

  /***************************************************
   *              Generate The Product Key
   **************************************************/
  async generateProductKey(email: string, userType: UserType) {
    const str = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return await bcrypt.hash(str, 10);
  }
}
