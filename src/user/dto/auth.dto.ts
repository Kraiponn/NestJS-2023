import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

/*******************************************************
 * SIGNUP FOR THE DATA TRANSFER OBJECT
 */
export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  //   @MinLength(5, { message: 'Phone must be a phone number' })
  @MinLength(5)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}

/*******************************************************
 * SIGNIN FOR THE DATA TRANSFER OBJECT
 */
export class SigninDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}

/*******************************************************
 * GENERATE PRODUCT KEY DTO
 */
export class GenerateProductKeyDTO {
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}
