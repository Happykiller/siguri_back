import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from './model/user.usecase.model';
import { CreateUserUsecaseDto } from './dto/create.user.usecase.dto';

export class CreateUserUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateUserUsecaseDto): Promise<UserUsecaseModel> {
    return await this.inversify.bddService.createUser(dto);
  }
}