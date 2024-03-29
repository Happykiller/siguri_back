import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import { ChestDbModel } from '@service/db/model/chest.db.model';
import { GetChestDbDto } from '@service/db/dto/get.chest.db.dto';
import { JoinChestDbDto } from '@service/db/dto/join.chest.db.dto';
import { LeaveChestDbDto } from '@service/db/dto/leave.chest.db.dto';
import { CreateChestDbDto } from '@service/db/dto/create.chest.db.dto';
import { UpdateChestDbDto } from '@service/db/dto/update.chest.db.dto';
import { GetChestsForUserDbDto } from '@service/db/dto/getForUser.chest.db.dto';

export class BddServiceChestMongo
  implements Pick<BddService, 'createChest' | 'getChest'>
{
  private async getChestCollection(): Promise<Collection> {
    return inversify.mongo.collection('chests');
  }

  async createChest(dto: CreateChestDbDto): Promise<ChestDbModel> {
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
        await this.getChestCollection()
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

  async getChest(dto: GetChestDbDto): Promise<ChestDbModel> {
    try {
      // Query for a movie that has the title 'The Room'
      const query = {
        active: true,
        $or: [{ _id: new ObjectId(dto.id) }],
      };
      const options = {};
      // Execute query
      const doc: any = await (
        await this.getChestCollection()
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

  async getChestsForUser(dto: GetChestsForUserDbDto): Promise<ChestDbModel[]> {
    // Query for a movie that has the title 'The Room'
    const query = {
      active: true,
    };
    const options = {};
    // Execute query
    const results = (await this.getChestCollection()).find(query, options);

    const chests: ChestDbModel[] = [];
    // Print returned documents
    for await (const doc of results) {
      if (doc.members.find((member) => member.user_id === dto.user_id)) {
        chests.push({
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

    return chests;
  }

  async joinChest(dto: JoinChestDbDto): Promise<boolean> {
    const chest = await this.getChest({
      id: dto.chest_id,
    });
    chest.members.push({
      user_id: dto.user_id,
    });

    await (
      await this.getChestCollection()
    ).updateOne(
      { _id: new ObjectId(dto.chest_id) },
      {
        $set: {
          members: chest.members,
        },
      },
    );

    return true;
  }

  async leaveChest(dto: LeaveChestDbDto): Promise<boolean> {
    const chest = await this.getChest({
      id: dto.chest_id,
    });
    chest.members = chest.members.filter((elt) => elt.user_id !== dto.user_id);

    await (
      await this.getChestCollection()
    ).updateOne(
      { _id: new ObjectId(dto.chest_id) },
      {
        $set: {
          members: chest.members,
        },
      },
    );

    return true;
  }

  async updateChest(dto: UpdateChestDbDto): Promise<ChestDbModel> {
    const set: any = {};

    if (dto.label) {
      set.label = dto.label;
    }

    if (dto.description) {
      set.description = dto.description;
    }

    await (
      await this.getChestCollection()
    ).updateOne(
      { _id: new ObjectId(dto.chest_id) },
      {
        $set: set,
      },
    );

    return await this.getChest({
      id: dto.chest_id,
    });
  }
}
