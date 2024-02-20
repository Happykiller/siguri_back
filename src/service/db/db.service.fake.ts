import { BddService } from "@service/db/db.service";
import { UserDbModel } from "@service/db/model/user.db.model";
import { CreateUserDbDto } from "./dto/create.user.db.dto";

export class BddServiceFake implements BddService {
  users: UserDbModel[] = [
    {
      code: 'faro'
    }
  ];

  createUser(dto: CreateUserDbDto): Promise<UserDbModel> {
    const user:UserDbModel = dto as UserDbModel;
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