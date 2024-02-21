import { ObjectId } from 'mongodb';

import { BddService } from '@service/db/db.service';
import { UserDbModel } from '@service/db/model/user.db.model';
import { GetUserDbDto } from '@service/db/dto/get.user.db.dto';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';

export class BddServiceFake implements BddService {
  users: UserDbModel[] = [
    {
      id: '65d4d015261e894a1da31a64',
      code: 'ropo',
      password:
        'uDLybl8FgPRbBicleIp/Hbb7ujedTr5gukZlcygGnYz4zyJsMAAdL0WEwxfwO6+1jI93qSR676s2QuyuKVD57w==',
      name_first: 'Robert',
      name_last: 'Paulson',
      description: 'password with secret secretKey',
      mail: 'r.paulson@bob.com',
      role: 'USER',
      active: true,
    },
  ];

  createUser(dto: CreateUserDbDto): Promise<UserDbModel> {
    const user: UserDbModel = {
      id: new ObjectId().toString(),
      ...dto,
      role: 'USER',
      active: true,
    };
    this.users.push(user);
    return Promise.resolve(user);
  }

  getAllUser(): Promise<UserDbModel[]> {
    return Promise.resolve(this.users);
  }

  getUser(dto: GetUserDbDto): Promise<UserDbModel> {
    return Promise.resolve(
      this.users.find((elt) => {
        if (dto.id) {
          return elt.id === dto.id && elt.active;
        } else if (dto.code) {
          return elt.code === dto.code && elt.active;
        }
      }),
    );
  }

  test(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
