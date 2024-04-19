import { SuccessResponse } from './apiResponse';

export interface AuthResponse
  extends SuccessResponse<{
    token: string;
  }> {}
