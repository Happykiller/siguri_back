import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import PasskeyDbModel from '@service/db/model/passkey.db.model';
import CreatePasskeyDbDto from '@service/db/dto/create.passkey.db.dto';
import { GetPasskeyByUserIdDbDto } from '../dto/getByUserId.passkey.db.dto';

export class BddServicePasskeyMongo implements Pick<BddService, 'createPasskey' | 'getPasskeyByUserId'> {

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

  async getPasskeyByUserId(dto: GetPasskeyByUserIdDbDto): Promise<PasskeyDbModel> {
    const query = {
      user_id: dto.user_id
    };
    const options = {};
    // Execute query
    const doc: any = await (
      await this.getPasskeyCollection()
    ).findOne(query, options);

    return Promise.resolve({
      id: doc._id.toString(),
      user_code: doc.user_code,
      user_id: doc.user_id,
      display_name: doc.display_name,
      challenge_buffer: doc.challenge_buffer,
      challenge: doc.challenge
    });
  }
}