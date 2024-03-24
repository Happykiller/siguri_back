import { ObjectId } from 'mongodb';

import { BddService } from '@service/db/db.service';
import PasskeyDbModel from '@service/db/model/passkey.db.model';
import CreatePasskeyDbDto from '@service/db/dto/create.passkey.db.dto';

export class BddServicePasskeyFake implements Pick<BddService, 'createPasskey'> {
  passkeyCollection: PasskeyDbModel[];

  getPasskeyCollection(): PasskeyDbModel[] {
    if (!this.passkeyCollection) {
      this.passkeyCollection = [];
    }
    return this.passkeyCollection;
  }

  createPasskey(dto: CreatePasskeyDbDto): Promise<boolean> {
    const entity: PasskeyDbModel = {
      id: new ObjectId().toString(),
      ...dto
    };
    this.getPasskeyCollection().push(entity);
    return Promise.resolve(true);
  }
}
