import { Collection, ObjectId } from 'mongodb';

import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import { USER_ROLE } from '@presentation/guard/userRole';
import { UserDbModel } from '@service/db/model/user.db.model';
import { GetUserDbDto } from '@service/db/dto/get.user.db.dto';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';

export class BddServiceUserMongo
  implements Pick<BddService, 'createUser' | 'getAllUser' | 'getUser'>
{
  private async getUserCollection(): Promise<Collection> {
    return inversify.mongo.collection('users');
  }

  async getAllUser(): Promise<UserDbModel[]> {
    // Query for a movie that has the title 'The Room'
    const query = {
      active: true,
    };
    const options = {};
    // Execute query
    const results = (await this.getUserCollection()).find(query, options);

    const users: UserDbModel[] = [];
    // Print returned documents
    for await (const doc of results) {
      users.push({
        id: doc._id.toString(),
        code: doc.code,
        password: doc.password,
        name_first: doc.name_first,
        name_last: doc.name_last,
        description: doc.description,
        mail: doc.mail,
        role: doc.role,
        active: doc.active,
      });
    }

    return users;
  }

  async getUser(dto: GetUserDbDto): Promise<UserDbModel> {
    try {
      // Query for a movie that has the title 'The Room'
      const query = {
        active: true,
        $or: [{ _id: new ObjectId(dto.id) }, { code: dto.code }],
      };
      const options = {};
      // Execute query
      const doc: any = await (
        await this.getUserCollection()
      ).findOne(query, options);

      return Promise.resolve({
        id: doc._id.toString(),
        code: doc.code,
        password: doc.password,
        name_first: doc.name_first,
        name_last: doc.name_last,
        description: doc.description,
        mail: doc.mail,
        role: doc.role,
        active: doc.active,
      });
    } catch (e) {
      return null;
    }
  }

  async createUser(dto: CreateUserDbDto): Promise<UserDbModel> {
    try {
      const result = await (
        await this.getUserCollection()
      ).insertOne({
        ...dto,
        role: USER_ROLE.ADMIN,
      });

      return Promise.resolve({
        id: result.insertedId.toString(),
        ...dto,
        role: USER_ROLE.ADMIN,
        active: true,
      });
    } catch (e) {
      return null;
    }
  }
}
