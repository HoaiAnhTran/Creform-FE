import { ErrorResponse, SuccessResponse } from './utils';

export interface UserInfor {
  email: string;
  username: string;
  avatar: string;
}

export interface AuthResponse
  extends SuccessResponse<{
    token: string;
    user: UserInfor;
  }> {}

export interface AuthErrorResponse extends ErrorResponse<{ message: string }> {}
