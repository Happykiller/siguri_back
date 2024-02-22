import { Inversify } from '@src/inversify/investify';
import { ChestDbModel } from '@src/service/db/model/chest.db.model';
import { ChestUsecaseModel } from '@usecase/chest/model/chest.usecase.model';
import { CreateChestUsecaseDto } from '@usecase/chest/dto/create.chest.usecase.dto';

export class CreateChestUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateChestUsecaseDto): Promise<ChestUsecaseModel> {
    dto.secret = this.inversify.cryptService.crypt({
      message: dto.secret,
    });
    const entity: ChestDbModel = await this.inversify.bddService.createChest(dto);
    return entity;
  }
}
