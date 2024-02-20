import { ObjectId } from "mongodb";

import { BddService } from "@service/db/db.service";
import { UserDbModel } from "@service/db/model/user.db.model";
import { CreateUserDbDto } from "@service/db/dto/create.user.db.dto";

export class BddServiceFake implements BddService {
  users: UserDbModel[] = [
    {
      id: '65d4d015261e894a1da31a64',
      code: 'ropo',
      password: 'WV5FXp063tPBcccZbqAHH0B93s2Wzf/nTXu8UaU2TeCMh+F0OsXUX02HNsI1Ytd2yowsT707bKCV0KC5uA0usQ==',
      name_first: 'Robert',
      name_last: 'Paulson',
      description: 'password with secret secretKey',
      mail: 'r.paulson@bob.com',
      role: 'USER'
    }
  ];

  createUser(dto: CreateUserDbDto): Promise<UserDbModel> {
    const user:UserDbModel = {
      id: new ObjectId().toString(),
      ... dto,
      role: 'USER'
    };
    this.users.push(user);
    return Promise.resolve(user);
  }

  getAllUser(): Promise<UserDbModel[]> {
    return Promise.resolve(this.users);
  }

  test(): Promise<boolean> {
    return Promise.resolve(true);
  }
}