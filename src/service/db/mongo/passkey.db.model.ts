import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import PasskeyDbModel from '@service/db/model/passkey.db.model';
import CreatePasskeyDbDto from '@service/db/dto/create.passkey.db.dto';

export class BddServicePasskeyMongo implements Pick<BddService, 'createPasskey'> {

  private async getPasskeyCollection(): Promise<Collection> {
    return inversify.mongo.collection('passkeys');
  }

  async createPasskey(dto: CreatePasskeyDbDto): Promise<boolean> {
    try {
      await (
        await this.getPasskeyCollection()
      ).insertOne({
        ...dto
      });
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }
}