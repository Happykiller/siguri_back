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

    const thing: ThingDbModel = {
      id: new ObjectId().toString(),
      ...data,
    };

    this.getThingCollection().push(thing);
    return Promise.resolve(JSON.parse(JSON.stringify(thing)));
  }

  getThing(dto: GetThingDbDto): Promise<ThingDbModel> {
    const thing = this.getThingCollection().find(
      (elt) => elt.id === dto.thing_id && elt.active,
    );
    return Promise.resolve(JSON.parse(JSON.stringify(thing)));
  }

  getForChestThings(dto: GetForChestThingsDbDto): Promise<ThingDbModel[]> {
    const things = this.getThingCollection().filter(
      (elt) => elt.active && elt.chest_id === dto.chest_id,
    );
    return Promise.resolve(JSON.parse(JSON.stringify(things)));
  }
}
