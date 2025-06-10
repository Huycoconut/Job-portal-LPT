import { Request } from 'express';
import { IUser } from 'src/users/user.interface';
 
export interface RequestWithUser extends Request {
  user: IUser;
}
