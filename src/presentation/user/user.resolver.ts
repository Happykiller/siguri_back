import { Inject } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';

@ObjectType()
export class UserModelResolver {
  @Field(() => String, { nullable: true })
  code: string;
}

@InputType()
export class CreateUserResolverDto {
  @Field(() => String)
  code: string;
}


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