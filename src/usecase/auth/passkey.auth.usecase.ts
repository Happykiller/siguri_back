import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';
import { UserSessionUsecaseModel } from '@usecase/user/model/userSession.usecase.model';
import { PasskeyAuthUsecaseDto } from './dto/passkey.auth.usecase.dto';

export class AuthPasskeyUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: PasskeyAuthUsecaseDto): Promise<UserSessionUsecaseModel> {
    const user: UserUsecaseModel = await this.inversify.getUserUsecase.execute({
      id: dto.user_id,
    });

    const passkey = await this.inversify.bddService.getPasskey({
      challenge_buffer: dto.challenge_buffer,
    });

    if (
      user &&
      passkey.user_id === dto.user_id &&
      passkey.user_code === dto.user_code &&
      passkey.challenge === dto.challenge &&
      passkey.challenge_buffer === dto.challenge_buffer
    ) {
      return {
        id: user.id,
        code: user.code,
        name_first: user.name_first,
        name_last: user.name_last,
        description: user.description,
        mail: user.mail,
        role: user.role,
      };
    } else {
      return null;
    }
  }
}
