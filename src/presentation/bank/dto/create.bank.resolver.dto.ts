import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBankResolverDto {
  @Field(() => String)
  label: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String)
  secret: string;
}
