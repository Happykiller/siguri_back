import { Field, ObjectType } from '@nestjs/graphql';

import { BankMemberModelResolver } from '@presentation/bank/model/bankMember.resolver.model';

@ObjectType()
export class BankModelResolver {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  label: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  author_id: string;
  @Field(() => [BankMemberModelResolver], { nullable: true })
  members: {
    user_id: string;
  }[];
}
