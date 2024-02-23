import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { USER_ROLE } from '@presentation/guard/userRole';
import { Roles } from '@presentation/guard/roles.decorator';
import { RolesGuard } from '@presentation/guard/roles.guard';
import { GqlAuthGuard } from '@presentation/guard/auth.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { UserModelResolver } from '@presentation/user/model/user.resolver.model';
import { ChestModelResolver } from '@presentation/chest/model/chest.resolver.model';
import { GetChestResolverDto } from '@presentation/chest/dto/get.chest.resolver.dto';
import { CreateChestResolverDto } from '@presentation/chest/dto/create.chest.resolver.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => ChestModelResolver)
export class ChestResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @ResolveField((of) => UserModelResolver)
  async author(
    @Parent() chest: ChestModelResolver,
  ): Promise<UserModelResolver> {
    const user: UserModelResolver = await this.inversify.getUserUsecase.execute(
      {
        id: chest.author_id,
      },
    );
    return user;
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Mutation((returns) => ChestModelResolver)
  async create_chest(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: CreateChestResolverDto,
  ): Promise<ChestModelResolver> {
    return this.inversify.createChestUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => ChestModelResolver)
  async chest(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: GetChestResolverDto,
  ): Promise<ChestModelResolver> {
    return this.inversify.getChestUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => [ChestModelResolver])
  async chestsForUser(
    @CurrentSession() session: UserSession,
  ): Promise<ChestModelResolver[]> {
    return this.inversify.getChestsForUserUsecase.execute({
      user_id: session.id,
    });
  }
}
