import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateThingCodeResolverDto {
  @Field(() => String)
  code: string;
}
