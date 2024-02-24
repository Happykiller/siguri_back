import { ObjectId } from 'mongodb';

import { BddService } from '@service/db/db.service';
import { chestRopo } from '@service/db/fake/mock/chest.ropo';
import { ChestDbModel } from '@service/db/model/chest.db.model';
import { GetChestDbDto } from '@service/db/dto/get.chest.db.dto';
import { CreateChestDbDto } from '@service/db/dto/create.chest.db.dto';
import { GetChestsForUserDbDto } from '@service/db/dto/getForUser.chest.db.dto';

export class BddServiceChestFake
  implements Pick<BddService, 'createChest' | 'getChest'>
{
  chestCollection: ChestDbModel[];

  getChestCollection(): ChestDbModel[] {
    if (!this.chestCollection) {
      this.chestCollection = [chestRopo];
    }
    return this.chestCollection;
  }

  createChest(dto: CreateChestDbDto): Promise<ChestDbModel> {
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

    const entity: ChestDbModel = {
      id: new ObjectId().toString(),
      ...data,
    };
    this.getChestCollection().push(entity);
    return Promise.resolve(entity);
  }

  getChest(dto: GetChestDbDto): Promise<ChestDbModel> {
    return Promise.resolve(
      this.getChestCollection().find((elt) => elt.id === dto.id && elt.active),
    );
  }

  getChestsForUser(dto: GetChestsForUserDbDto): Promise<ChestDbModel[]> {
    return Promise.resolve(
      this.getChestCollection().filter(
        (elt) =>
          elt.active &&
          elt.members.find((member) => dto.user_id === member.user_id),
      ),
    );
  }
}