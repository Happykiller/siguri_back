import { Inversify } from '@src/inversify/investify';
import { JoinChestUsecaseDto } from '@usecase/chest/dto/join.chest.usecase.dto';

export class JoinChestUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: JoinChestUsecaseDto): Promise<boolean> {
    return await this.inversify.bddService.joinChest(dto);
  }
}
