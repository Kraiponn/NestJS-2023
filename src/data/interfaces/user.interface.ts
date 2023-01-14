import { UserType } from '@prisma/client';

export interface ISignupResponse {
  id: number;
  email: string;
  phone: string;
  user_type: UserType;
}
