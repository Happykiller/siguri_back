import { Inject } from '@nestjs/common';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Inversify } from '@src/inversify/investify';

@ObjectType()
export class HelloModelResolver {
  @Field(() => String, { nullable: true })
  message: string;
}

@Resolver(of => HelloModelResolver)
export class HelloResolver {

  constructor(
    @Inject('Inversify')
    private inversify: Inversify
  ) {}

  @Query(returns => HelloModelResolver)
  async hello(): Promise<HelloModelResolver> {
    const test = await this.inversify.bddService.test();
    console.log(test);
    return {
      message: 'Hello World'
    };
  }
}