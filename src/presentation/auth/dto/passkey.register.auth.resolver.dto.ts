import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PasskeyRegisterAuthResolverDto {
  @Field(() => String)
  display_name: string;
  @Field(() => String)
  challenge_buffer: string;
  @Field(() => String)
  challenge: string;
}