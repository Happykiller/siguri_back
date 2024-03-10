import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ThingCredentialResolverModel {
  @Field(() => String)
  id: string;
  @Field(() => String)
  password: string;
  @Field(() => String, { nullable: true })
  address?: string;
}