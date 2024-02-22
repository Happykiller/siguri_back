import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BankMemberModelResolver {
  @Field(() => String, { nullable: true })
  user_id: string;
}
