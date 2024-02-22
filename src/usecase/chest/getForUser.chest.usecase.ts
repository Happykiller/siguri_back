import { Inversify } from '@src/inversify/investify';
import { ChestDbModel } from '@src/service/db/model/chest.db.model';
import { ChestUsecaseModel } from '@usecase/chest/model/chest.usecase.model';
import { GetChestsForUserUsecaseDto } from '@usecase/chest/dto/getForUser.chest.usecase.dto';

export class GetChestsForUserUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetChestsForUserUsecaseDto): Promise<ChestUsecaseModel[]> {
    const entity: ChestDbModel[] =
      await this.inversify.bddService.getChestsForUser(dto);
    return entity;
  }
}
