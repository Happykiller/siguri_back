import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { GetThingDbDto } from '@service/db/dto/get.thing.db.dto';
import { CreateThingDbDto } from '@service/db/dto/create.thing.db.dto';
import { UpdateThingDbDto } from '@service/db/dto/update.thing.db.dto';
import { DeleteThingDbDto } from '@service/db/dto/delete.thing.db.dto';
import { GetForChestThingsDbDto } from '@service/db/dto/getForChest.thing.db.dto';

export class BddServiceThingMongo
  implements Pick<BddService, 'createThing' | 'getThing' | 'getForChestThings' | 'updateThing' | 'deleteThing'>
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

  async updateThing(dto: UpdateThingDbDto): Promise<ThingDbModel> {
    try {
      const set:any = {};

      if (dto.label) {
        set.label = dto.label;
      }
  
      if (dto.description) {
        set.description = dto.description;
      }
  
      if (dto.cb) {
        set.cb = dto.cb;
      }
  
      if (dto.note) {
        set.note = dto.note;
      }
  
      if (dto.code) {
        set.code = dto.code;
      }
  
      if (dto.credential) {
        set.credential = dto.credential;
      }
  
      if (dto.totp) {
        set.totp = dto.totp;
      }

      await (
        await this.getThingCollection()
      ).updateOne({ _id: new ObjectId(dto.thing_id) }, 
      { 
        $set: set
      });

      return await this.getThing({
        thing_id: dto.thing_id
      });
    } catch (e) {
      return null;
    }
  }

  async deleteThing(dto: DeleteThingDbDto): Promise<boolean> {
    try {
      await (
        await this.getThingCollection()
      ).updateOne({ _id: new ObjectId(dto.thing_id) }, 
      { 
        $set: {active: false}
      });

      return true;
    } catch (e) {
      return null;
    }
  }

  async getThing(dto: GetThingDbDto): Promise<ThingDbModel> {
    try {
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
        totp: doc.totp,
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
        totp: doc.totp,
        chest_id: doc.chest_id,
        author_id: doc.author_id,
        active: doc.active,
      });
    }

    return things;
  }
}
