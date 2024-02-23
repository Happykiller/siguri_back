import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { GetThingDbDto } from '@service/db/dto/get.thing.db.dto';
import { CreateThingDbDto } from '@service/db/dto/create.thing.db.dto';
import { GetForChestThingsDbDto } from '@service/db/dto/getForChest.thing.db.dto';

export class BddServiceThingMongo
  implements Pick<BddService, 'createThing' | 'getThing' | 'getForChestThings'>
{
  private async getThingCollection(): Promise<Collection> {
    return inversify.mongo.collection('things');
  }

  async createThing(dto: CreateThingDbDto): Promise<ThingDbModel> {
    try {
      const data = {
        ...dto,
        author_id: dto.user_id,
        active: true,
      };
      delete data.user_id;

      const result = await (
        await this.getThingCollection()
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

  async getThing(dto: GetThingDbDto): Promise<ThingDbModel> {
    try {
      // Query for a movie that has the title 'The Room'
      const query = {
        active: true,
        $or: [{ _id: new ObjectId(dto.thing_id) }],
      };
      const options = {};
      // Execute query
      const doc: any = await (
        await this.getThingCollection()
      ).findOne(query, options);

      return Promise.resolve({
        id: doc._id.toString(),
        label: doc.label,
        description: doc.description,
        type: doc.type,
        cb: doc.cb,
        code: doc.code,
        credential: doc.credential,
        note: doc.note,
        chest_id: doc.chest_id,
        author_id: doc.author_id,
        active: doc.active,
      });
    } catch (e) {
      return null;
    }
  }

  async getForChestThings(
    dto: GetForChestThingsDbDto,
  ): Promise<ThingDbModel[]> {
    // Query for a movie that has the title 'The Room'
    const query = {
      active: true,
      chest_id: dto.chest_id,
    };
    const options = {};
    // Execute query
    const results = (await this.getThingCollection()).find(query, options);

    const things: ThingDbModel[] = [];
    // Print returned documents
    for await (const doc of results) {
      things.push({
        id: doc._id.toString(),
        label: doc.label,
        description: doc.description,
        type: doc.type,
        cb: doc.cb,
        code: doc.code,
        credential: doc.credential,
        note: doc.note,
        chest_id: doc.chest_id,
        author_id: doc.author_id,
        active: doc.active,
      });
    }

    return things;
  }
}
