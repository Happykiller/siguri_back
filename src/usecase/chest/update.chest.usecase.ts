import { Inversify } from '@src/inversify/investify';
import { ChestDbModel } from '@service/db/model/chest.db.model';
import { ChestUsecaseModel } from '@usecase/chest/model/chest.usecase.model';
import UpdateChestUsecaseDto from '@usecase/chest/dto/update.chest.usecase.dto';

export class UpdateChestUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: UpdateChestUsecaseDto): Promise<ChestUsecaseModel> {
    const entity: ChestDbModel =
      await this.inversify.bddService.updateChest(dto);
    return entity;
  }
}
