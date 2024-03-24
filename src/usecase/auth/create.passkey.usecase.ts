import { Inversify } from '@src/inversify/investify';
import CreatePasskeyAuthUsecaseDto from '@usecase/auth/dto/create.passkey.auth.usecase';

export class CreatePasskeyUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  execute(
    dto: CreatePasskeyAuthUsecaseDto,
  ): Promise<boolean> {
    return this.inversify.bddService.createPasskey(dto);
  }
}