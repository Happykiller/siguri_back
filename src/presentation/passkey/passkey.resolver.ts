import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { GqlAuthGuard } from '@presentation/guard/auth.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { PasskeyRegisterAuthResolverDto } from '@src/presentation/passkey/dto/passkey.register.auth.resolver.dto';

@Resolver('PasskeyResolver')
export class PasskeyResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(
    /* istanbul ignore next */
    (): typeof Boolean => Boolean,
  )
  async create_passkey(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: PasskeyRegisterAuthResolverDto,
  ): Promise<Boolean> {
    await this.inversify.createPasskeyUsecase.execute({
      user_id: session.id,
      user_code: session.code,
      display_name: dto.display_name,
      challenge_buffer: dto.challenge_buffer,
      challenge: dto.challenge
    });
    return true;
  }
}
