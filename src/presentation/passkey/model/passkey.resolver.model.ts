import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasskeyResolverModel {
  @Field(() => String)
  id: string;
  @Field(() => String)
  label: string;
  @Field(() => String)
  user_id: string;
  @Field(() => String)
  user_code: string;
  @Field(() => String)
  display_name: string;
  @Field(() => String)
  challenge_buffer: string;
}
