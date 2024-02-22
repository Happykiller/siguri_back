import { ERRORS } from '@src/common/ERROR';
import { Inversify } from '@src/inversify/investify';
import { ChestDbModel } from '@src/service/db/model/chest.db.model';
import { ChestUsecaseModel } from '@usecase/chest/model/chest.usecase.model';
import { GetChestUsecaseDto } from '@usecase/chest/dto/get.chest.usecase.dto';

export class GetChestUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetChestUsecaseDto): Promise<ChestUsecaseModel> {
    const entity: ChestDbModel = await this.inversify.bddService.getChest({
      id: dto.id,
    });

    if (!entity) {
      throw new Error(ERRORS.GET_BANK_USECASE_BANK_NOT_FOUND);
    }

    const cryptSecret = this.inversify.cryptService.crypt({
      message: dto.secret,
    });

    if (cryptSecret !== entity.secret) {
      throw new Error(ERRORS.GET_BANK_USECASE_WRONG_SECRET);
    }

    if (!entity.members.find((elt) => elt.user_id === dto.user_id)) {
      throw new Error(ERRORS.GET_BANK_USECASE_USER_NOT_IN_MEMBERS);
    }

    return entity;
  }
}
