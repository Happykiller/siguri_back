import { UserDbModel } from '@service/db/model/user.db.model';
import { GetUserDbDto } from '@service/db/dto/get.user.db.dto';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';

export interface BddService {
  test(): Promise<boolean>;
  /**
   * User
   */
  getAllUser(): Promise<UserDbModel[]>;
  getUser(dto: GetUserDbDto): Promise<UserDbModel>;
  createUser(dto: CreateUserDbDto): Promise<UserDbModel>;
}
