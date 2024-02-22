import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetBankResolverDto {
  @Field(() => String)
  id: string;
  @Field(() => String)
  secret: string;
}
