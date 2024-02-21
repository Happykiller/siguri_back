import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetSessionAuthResolverDto {
  @Field({ description: 'User code for the session' })
  login: string;
  @Field({ description: 'Password for the session' })
  password: string;
}
