import { Inversify } from '@src/inversify/investify';
import { BankDbModel } from '@src/service/db/model/bank.db.model';
import { BankUsecaseModel } from '@usecase/bank/model/bank.usecase.model';
import { GetBanksForUserUsecaseDto } from '@usecase/bank/dto/getForUser.bank.usecase.dto';

export class GetBanksForUserUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetBanksForUserUsecaseDto): Promise<BankUsecaseModel[]> {
    const entity: BankDbModel[] =
      await this.inversify.bddService.getBanksForUser(dto);
    return entity;
  }
}
