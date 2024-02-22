import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import { BankDbModel } from '@service/db/model/bank.db.model';
import { GetBankDbDto } from '@service/db/dto/get.bank.db.dto';
import { CreateBankDbDto } from '@service/db/dto/create.bank.db.dto';
import { GetBanksForUserDbDto } from '../dto/getForUser.bank.db.dto';

export class BddServiceBankMongo
  implements Pick<BddService, 'createBank' | 'getBank'>
{
  private async getBankCollection(): Promise<Collection> {
    return inversify.mongo.collection('banks');
  }

  async createBank(dto: CreateBankDbDto): Promise<BankDbModel> {
    try {
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

      const result = await (
        await this.getBankCollection()
      ).insertOne({
        ...data,
      });

      return Promise.resolve({
        id: result.insertedId.toString(),
        ...data,
      });
    } catch (e) {
      return null;
    }
  }

  async getBank(dto: GetBankDbDto): Promise<BankDbModel> {
    try {
      // Query for a movie that has the title 'The Room'
      const query = {
        active: true,
        $or: [{ _id: new ObjectId(dto.id) }],
      };
      const options = {};
      // Execute query
      const doc: any = await (
        await this.getBankCollection()
      ).findOne(query, options);

      return Promise.resolve({
        id: doc._id.toString(),
        label: doc.label,
        secret: doc.secret,
        members: doc.members,
        description: doc.description,
        author_id: doc.author_id,
        active: doc.active,
      });
    } catch (e) {
      return null;
    }
  }

  async getBanksForUser(dto: GetBanksForUserDbDto): Promise<BankDbModel[]> {
    // Query for a movie that has the title 'The Room'
    const query = {
      active: true,
    };
    const options = {};
    // Execute query
    const results = (await this.getBankCollection()).find(query, options);

    const banks: BankDbModel[] = [];
    // Print returned documents
    for await (const doc of results) {
      if (doc.members.find((member) => member.user_id === dto.user_id)) {
        banks.push({
          id: doc._id.toString(),
          label: doc.label,
          secret: doc.secret,
          members: doc.members,
          description: doc.description,
          author_id: doc.author_id,
          active: doc.active,
        });
      }
    }

    return banks;
  }
}
