import { JwtPayload } from 'jwt-decode';

export interface AuthResponse {
  accessToken: string;
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}
