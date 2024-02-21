import { UserDbModel } from '@service/db/model/user.db.model';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';

export interface BddService {
  test(): Promise<boolean>;
  /**
   * User
   */
  getAllUser(): Promise<UserDbModel[]>;
  createUser(dto: CreateUserDbDto): Promise<UserDbModel>;
}
