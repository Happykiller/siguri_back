import { ERRORS } from '@src/common/ERROR';
import { Inversify } from '@src/inversify/investify';
import { BankDbModel } from '@src/service/db/model/bank.db.model';
import { BankUsecaseModel } from '@usecase/bank/model/bank.usecase.model';
import { GetBankUsecaseDto } from '@usecase/bank/dto/get.bank.usecase.dto';

export class GetBankUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetBankUsecaseDto): Promise<BankUsecaseModel> {
    const entity: BankDbModel = await this.inversify.bddService.getBank({
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
