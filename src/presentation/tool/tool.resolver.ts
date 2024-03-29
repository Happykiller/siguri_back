import { authenticator } from 'otplib';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { GqlAuthGuard } from '@presentation/guard/auth.guard';
import { GetTotpCodeToolResolverDto } from '@presentation/tool/dto/getTotpCode.tool.resolver.dto';
import { GeneratePasswordResolverDto } from '@presentation/tool/dto/generatePassword.tool.resolver.dto';
import { GeneratePasswordModelResolver } from '@presentation/tool/model/generatePassword.tool.resolver.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver('ToolResolver')
export class ToolResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @UseGuards(GqlAuthGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => GeneratePasswordModelResolver)
  async generatePassword(
    @Args('dto') dto: GeneratePasswordResolverDto,
  ): Promise<GeneratePasswordModelResolver> {
    return {
      password: this.inversify.passwordService.generate(dto),
    };
  }

  @UseGuards(GqlAuthGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query(
    /* istanbul ignore next */
    () => String,
  )
  async get_totp_code(
    @Args('dto') dto: GetTotpCodeToolResolverDto,
  ): Promise<string> {
    const token = authenticator.generate(dto.secret);
    return token;
  }
}
