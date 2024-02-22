import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';

import { Inversify } from '@src/inversify/investify';
import { GqlAuthGuard } from '@presentation/guard/auth.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { AuthModelResolver } from '@presentation/auth/model/auth.resolver.model';
import { UserSessionUsecaseModel } from '@usecase/user/model/userSession.usecase.model';
import { GetSessionAuthResolverDto } from '@src/presentation/auth/dto/getSession.auth.resolver.dto';

@Resolver('AuthResolver')
export class AuthResolver {
  constructor(
    private jwtService: JwtService,
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @Query(
    /* istanbul ignore next */
    (): typeof AuthModelResolver => AuthModelResolver,
  )
  async auth(
    @Args('dto') dto: GetSessionAuthResolverDto,
  ): Promise<AuthModelResolver> {
    const userSession: UserSessionUsecaseModel =
      await this.inversify.authUsecase.execute(dto);

    if (!userSession) {
      throw new UnauthorizedException('Credentials wrong');
    }

    const token = this.jwtService.sign({
      code: userSession.code,
      id: userSession.id,
    });
    return {
      accessToken: token,
      ...userSession,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(
    /* istanbul ignore next */
    (): typeof AuthModelResolver => AuthModelResolver,
  )
  async getSessionInfo(
    @CurrentSession() session: UserSession,
  ): Promise<AuthModelResolver> {
    const userSession: UserSessionUsecaseModel =
      await this.inversify.getUserUsecase.execute({
        id: session.id,
      });

    if (!userSession) {
      throw new UnauthorizedException('Credentials wrong');
    }

    const token = this.jwtService.sign({
      code: userSession.code,
      id: userSession.id,
      role: userSession.role
    });
    return {
      accessToken: token,
      ...userSession,
    };
  }
}
