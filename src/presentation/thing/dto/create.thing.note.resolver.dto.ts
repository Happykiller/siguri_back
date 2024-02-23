import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateThingCredentialResolverDto {
  @Field(() => String)
  id: string;
  @Field(() => String)
  password: string;
  @Field(() => String, { nullable: true })
  address?: string;
}
