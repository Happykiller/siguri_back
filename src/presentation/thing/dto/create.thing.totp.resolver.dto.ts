import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateThingTotpResolverDto {
  @Field(() => String)
  secret: string;
}
