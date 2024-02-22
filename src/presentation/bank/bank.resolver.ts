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
import { BankModelResolver } from '@presentation/bank/model/bank.resolver.model';
import { UserModelResolver } from '@presentation/user/model/user.resolver.model';
import { GetBankResolverDto } from '@presentation/bank/dto/get.bank.resolver.dto';
import { CreateBankResolverDto } from '@presentation/bank/dto/create.bank.resolver.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => BankModelResolver)
export class BankResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @ResolveField((of) => UserModelResolver)
  async author(@Parent() bank: BankModelResolver): Promise<UserModelResolver> {
    const user: UserModelResolver = await this.inversify.getUserUsecase.execute(
      {
        id: bank.author_id,
      },
    );
    return user;
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Mutation((returns) => BankModelResolver)
  async create_bank(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: CreateBankResolverDto,
  ): Promise<BankModelResolver> {
    return this.inversify.createBankUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => BankModelResolver)
  async bank(
    @CurrentSession() session: UserSession,
    @Args('dto') dto: GetBankResolverDto,
  ): Promise<BankModelResolver> {
    return this.inversify.getBankUsecase.execute({
      ...dto,
      user_id: session.id,
    });
  }

  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => [BankModelResolver])
  async banksForUser(
    @CurrentSession() session: UserSession,
  ): Promise<BankModelResolver[]> {
    return this.inversify.getBanksForUserUsecase.execute({
      user_id: session.id,
    });
  }
}
