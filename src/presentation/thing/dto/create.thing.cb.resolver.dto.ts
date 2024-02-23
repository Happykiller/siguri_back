import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateThingCbResolverDto {
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
