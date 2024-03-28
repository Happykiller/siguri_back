import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';
import { UserSessionUsecaseModel } from '@usecase/user/model/userSession.usecase.model';
import { PasskeyAuthUsecaseDto } from './dto/passkey.auth.usecase.dto';
import * as server from './passwordless/server';

export class AuthPasskeyUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: any): Promise<UserSessionUsecaseModel> {
    console.log('dto', dto)
;
    const user: UserUsecaseModel = await this.inversify.getUserUsecase.execute({
      code: dto.user_code,
    });

    console.log('user', user)

    const passkey = await this.inversify.bddService.getPasskey({
      credential_id: dto.credentialId,
    });

    console.log('passkey', passkey)

    const expected = {
      challenge: passkey.challenge,
      origin: (origin) => origin.includes(passkey.hostname),
      userVerified: true, // no function allowed here
      verbose: true, // optional, enables debug logs containing sensitive information
    }

    const verified = await server.verifyAuthentication(dto, passkey.registration.credential, expected);

    console.log('verified', verified)

    if (
      user
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
