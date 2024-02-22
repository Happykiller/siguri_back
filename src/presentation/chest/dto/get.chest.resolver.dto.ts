import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetChestResolverDto {
  @Field(() => String)
  id: string;
  @Field(() => String)
  secret: string;
}
