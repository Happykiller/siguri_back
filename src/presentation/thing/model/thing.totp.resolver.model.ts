import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ThingTotpResolverModel {
  @Field(() => String)
  secret: string;
}
