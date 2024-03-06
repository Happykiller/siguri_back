import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LeaveChestResolverDto {
  @Field(() => String)
  chest_id: string;
}
