import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetThingsForChestResolverDto {
  @Field(() => String)
  chest_id: string;
  @Field(() => String)
  chest_secret: string;
}
