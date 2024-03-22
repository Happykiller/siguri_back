import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateChestResolverDto {
  @Field(() => String)
  chest_id: string;
  @Field(() => String)
  label: string;
  @Field(() => String, { nullable: true })
  description?: string;
}
