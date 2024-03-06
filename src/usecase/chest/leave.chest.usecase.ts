import { Inversify } from '@src/inversify/investify';
import { LeaveChestUsecaseDto } from '@usecase/chest/dto/leave.chest.usecase.dto';

export class LeaveChestUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: LeaveChestUsecaseDto): Promise<boolean> {
    return await this.inversify.bddService.leaveChest(dto);
  }
}
