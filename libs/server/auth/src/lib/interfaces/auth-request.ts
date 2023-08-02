import { User } from '@base/server/user';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: User;
}
