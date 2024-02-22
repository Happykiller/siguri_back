import { Inject } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { UserModelResolver } from '@presentation/user/model/user.resolver.model';
import { ChestMemberModelResolver } from '@src/presentation/chest/model/chestMember.resolver.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => ChestMemberModelResolver)
export class ChestMemberResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  @ResolveField((of) => UserModelResolver)
  async user(
    @Parent() chestMember: ChestMemberModelResolver,
  ): Promise<UserModelResolver> {
    const user: UserModelResolver = await this.inversify.getUserUsecase.execute(
      {
        id: chestMember.user_id,
      },
    );
    return user;
  }
}
