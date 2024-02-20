import { Inject } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { UserModelResolver } from './model/user.resolver.model';
import { CreateUserResolverDto } from './dto/create.user.resolver.dto';

@Resolver(of => UserModelResolver)
export class UserResolver {

  constructor(
    @Inject('Inversify')
    private inversify: Inversify
  ) {}

  @Query(returns => [UserModelResolver])
  async users(): Promise<UserModelResolver[]> {
    return this.inversify.getAllUserUsecase.execute();
  }

  @Mutation(returns => UserModelResolver)
  async create_user(@Args('dto') dto: CreateUserResolverDto): Promise<UserModelResolver> {
    return this.inversify.createUserUsecase.execute(dto);
  }
}