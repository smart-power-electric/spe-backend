import { User } from './user.entity';

export type LoggedUser = {
  user: User;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
};
