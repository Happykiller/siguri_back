import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ThingCbResolverModel {
  @Field(() => String)
  code: string;
  @Field(() => String)
  label: string;
  @Field(() => String)
  number: string;
  @Field(() => String)
  expiration_date: string;
  @Field(() => String)
  crypto: string;
}
