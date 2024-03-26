import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PasskeyAuthResolverDto {
  @Field(() => String)
  user_id: string;
  @Field(() => String)
  user_code: string;
  @Field(() => String)
  challenge_buffer: string;
  @Field(() => String)
  challenge: string;
}
