import { Inversify } from '@src/inversify/investify';
import { UserDbModel } from '@service/db/model/user.db.model';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';
import { CreateUserUsecaseDto } from '@usecase/user/dto/create.user.usecase.dto';

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
