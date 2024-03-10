import { ObjectId } from 'mongodb';

import { BddService } from '@service/db/db.service';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { GetThingDbDto } from '@service/db/dto/get.thing.db.dto';
import { UpdateThingDbDto } from '@service/db/dto/update.thing.db.dto';
import { CreateThingDbDto } from '@service/db/dto/create.thing.db.dto';
import { DeleteThingDbDto } from '@service/db/dto/delete.thing.db.dto';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { GetForChestThingsDbDto } from '@service/db/dto/getForChest.thing.db.dto';

export class BddServiceThingFake
  implements Pick<BddService, 'createThing' | 'getThing' | 'getForChestThings' | 'updateThing' | 'deleteThing'>
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

  updateThing(dto: UpdateThingDbDto): Promise<ThingDbModel> {
    const thing = this.getThingCollection().find(
      (elt) => elt.id === dto.thing_id && elt.active,
    );

    if (dto.label) {
      thing.label = dto.label;
    }

    if (dto.description) {
      thing.description = dto.description;
    }

    if (dto.cb) {
      thing.cb = dto.cb;
    }

    if (dto.note) {
      thing.note = dto.note;
    }

    if (dto.code) {
      thing.code = dto.code;
    }

    if (dto.credential) {
      thing.credential = dto.credential;
    }

    if (dto.totp) {
      thing.totp = dto.totp;
    }

    return Promise.resolve(JSON.parse(JSON.stringify(thing)));
  }

  deleteThing(dto: DeleteThingDbDto): Promise<boolean> {
    const thing = this.getThingCollection().find(
      (elt) => elt.id === dto.thing_id && elt.active,
    );

    thing.active = false;

    return Promise.resolve(true);
  }

  getThing(dto: GetThingDbDto): Promise<ThingDbModel> {
    const thing = this.getThingCollection().find(
      (elt) => elt.id === dto.thing_id && elt.active,
    );

    if (thing) {
      return Promise.resolve(JSON.parse(JSON.stringify(thing)));
    } else {
      return null;
    }
  }

  getForChestThings(dto: GetForChestThingsDbDto): Promise<ThingDbModel[]> {
    const things = this.getThingCollection().filter(
      (elt) => elt.active && elt.chest_id === dto.chest_id,
    );
    return Promise.resolve(JSON.parse(JSON.stringify(things)));
  }
}
