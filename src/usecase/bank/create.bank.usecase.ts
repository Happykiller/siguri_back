import { Inversify } from '@src/inversify/investify';
import { BankDbModel } from '@src/service/db/model/bank.db.model';
import { BankUsecaseModel } from '@usecase/bank/model/bank.usecase.model';
import { CreateBankUsecaseDto } from '@usecase/bank/dto/create.bank.usecase.dto';

export class CreateBankUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateBankUsecaseDto): Promise<BankUsecaseModel> {
    dto.secret = this.inversify.cryptService.crypt({
      message: dto.secret,
    });
    const entity: BankDbModel = await this.inversify.bddService.createBank(dto);
    return entity;
  }
}
