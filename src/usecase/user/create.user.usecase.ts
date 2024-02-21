import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from './model/user.usecase.model';
import { CreateUserUsecaseDto } from './dto/create.user.usecase.dto';
import { UserDbModel } from '@src/service/db/model/user.db.model';

export class CreateUserUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateUserUsecaseDto): Promise<UserUsecaseModel> {
    dto.password = this.inversify.cryptService.crypt({
      message: dto.password,
    });
    const user: UserDbModel = await this.inversify.bddService.createUser(dto);
    return user;
  }
}
