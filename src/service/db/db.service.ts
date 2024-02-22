import { UserDbModel } from '@service/db/model/user.db.model';
import { BankDbModel } from '@service/db/model/bank.db.model';
import { GetUserDbDto } from '@service/db/dto/get.user.db.dto';
import { GetBankDbDto } from '@service/db/dto/get.bank.db.dto';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';
import { CreateBankDbDto } from '@service/db/dto/create.bank.db.dto';
import { GetBanksForUserDbDto } from '@service/db/dto/getForUser.bank.db.dto';

export interface BddService {
  test(): Promise<boolean>;
  /**
   * User
   */
  getAllUser(): Promise<UserDbModel[]>;
  getUser(dto: GetUserDbDto): Promise<UserDbModel>;
  createUser(dto: CreateUserDbDto): Promise<UserDbModel>;
  /**
   * Bank
   */
  createBank(dto: CreateBankDbDto): Promise<BankDbModel>;
  getBank(dto: GetBankDbDto): Promise<BankDbModel>;
  getBanksForUser(dto: GetBanksForUserDbDto): Promise<BankDbModel[]>;
}
