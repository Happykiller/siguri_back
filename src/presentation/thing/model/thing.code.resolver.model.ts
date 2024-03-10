import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ThingCodeResolverModel {
  @Field(() => String)
  code: string;
}
