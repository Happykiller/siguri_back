import { ObjectId } from 'mongodb';

import { BddService } from '@service/db/db.service';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { GetThingDbDto } from '@service/db/dto/get.thing.db.dto';
import { CreateThingDbDto } from '@service/db/dto/create.thing.db.dto';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { GetForChestThingsDbDto } from '@service/db/dto/getForChest.thing.db.dto';

export class BddServiceThingFake
  implements Pick<BddService, 'createThing' | 'getThing' | 'getForChestThings'>
{
  thingCollection: ThingDbModel[];

  getThingCollection(): ThingDbModel[] {
    if (!this.thingCollection) {
      this.thingCollection = [thingChestRopo];
    }
    return this.thingCollection;
  }

  createThing(dto: CreateThingDbDto): Promise<ThingDbModel> {
    const data = {
      ...dto,
      author_id: dto.user_id,
      active: true,
    };
    delete data.user_id;

    const entity: ThingDbModel = {
      id: new ObjectId().toString(),
      ...data,
    };
    this.getThingCollection().push(entity);
    return Promise.resolve(entity);
  }

  getThing(dto: GetThingDbDto): Promise<ThingDbModel> {
    return Promise.resolve(
      this.getThingCollection().find(
        (elt) => elt.id === dto.thing_id && elt.active,
      ),
    );
  }

  getForChestThings(dto: GetForChestThingsDbDto): Promise<ThingDbModel[]> {
    return Promise.resolve(
      this.getThingCollection().filter(
        (elt) => elt.active && elt.chest_id === dto.chest_id,
      ),
    );
  }
}
