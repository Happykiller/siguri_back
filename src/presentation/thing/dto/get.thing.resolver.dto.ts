import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetThingResolverDto {
  @Field(() => String)
  thing_id: string;
  @Field(() => String)
  chest_secret: string;
}
