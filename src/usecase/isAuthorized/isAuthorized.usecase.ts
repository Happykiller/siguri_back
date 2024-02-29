import { ERRORS } from '@src/common/ERROR';
import { Inversify } from '@src/inversify/investify';
import { ChestDbModel } from '@service/db/model/chest.db.model';
import { IsAutorizedUsecaseDto } from './isAutorized.usecase.dto';

export class IsAutorizedUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: IsAutorizedUsecaseDto): Promise<boolean> {
    const entity: ChestDbModel = await this.inversify.bddService.getChest({
      id: dto.chest_id,
    });

    if (dto.chest_secret) {
      const cryptSecret = this.inversify.cryptService.crypt({
        message: dto.chest_secret,
      });

      if (cryptSecret !== entity.secret) {
        throw new Error(ERRORS.GET_CHEST_USECASE_WRONG_SECRET);
      }
    }

    if (!entity.members.find((elt) => elt.user_id === dto.user_id)) {
      throw new Error(ERRORS.GET_CHEST_USECASE_USER_NOT_IN_MEMBERS);
    }

    return true;
  }
}
