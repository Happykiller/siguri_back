import { ObjectId } from 'mongodb';

import { BddService } from '@service/db/db.service';
import { bankRopo } from '@service/db/fake/mock/bank.ropo';
import { BankDbModel } from '@service/db/model/bank.db.model';
import { GetBankDbDto } from '@service/db/dto/get.bank.db.dto';
import { CreateBankDbDto } from '@service/db/dto/create.bank.db.dto';
import { GetBanksForUserDbDto } from '../dto/getForUser.bank.db.dto';

export class BddServiceBankFake
  implements Pick<BddService, 'createBank' | 'getBank'>
{
  bankCollection: BankDbModel[];

  getBankCollection(): BankDbModel[] {
    if (!this.bankCollection) {
      this.bankCollection = [bankRopo];
    }
    return this.bankCollection;
  }

  createBank(dto: CreateBankDbDto): Promise<BankDbModel> {
    const data = {
      ...dto,
      members: [
        {
          user_id: dto.user_id,
        },
      ],
      author_id: dto.user_id,
      active: true,
    };
    delete data.user_id;

    const entity: BankDbModel = {
      id: new ObjectId().toString(),
      ...data,
    };
    this.getBankCollection().push(entity);
    return Promise.resolve(entity);
  }

  getBank(dto: GetBankDbDto): Promise<BankDbModel> {
    return Promise.resolve(
      this.getBankCollection().find((elt) => elt.id === dto.id && elt.active),
    );
  }

  getBanksForUser(dto: GetBanksForUserDbDto): Promise<BankDbModel[]> {
    return Promise.resolve(
      this.getBankCollection().filter(
        (elt) =>
          elt.active &&
          elt.members.find((member) => dto.user_id === member.user_id),
      ),
    );
  }
}
