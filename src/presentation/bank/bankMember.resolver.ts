import { Inject } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { UserModelResolver } from '@presentation/user/model/user.resolver.model';
import { BankMemberModelResolver } from '@presentation/bank/model/bankMember.resolver.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => BankMemberModelResolver)
export class BankMemberResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  @ResolveField((of) => UserModelResolver)
  async user(
    @Parent() bankMember: BankMemberModelResolver,
  ): Promise<UserModelResolver> {
    const user: UserModelResolver = await this.inversify.getUserUsecase.execute(
      {
        id: bankMember.user_id,
      },
    );
    return user;
  }
}
