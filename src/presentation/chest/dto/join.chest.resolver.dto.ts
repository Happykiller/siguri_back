import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinChestResolverDto {
  @Field(() => String)
  chest_id: string;
}
