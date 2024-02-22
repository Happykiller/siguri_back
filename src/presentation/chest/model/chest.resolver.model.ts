import { Field, ObjectType } from '@nestjs/graphql';

import { ChestMemberModelResolver } from '@src/presentation/chest/model/chestMember.resolver.model';

@ObjectType()
export class ChestModelResolver {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  label: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  author_id: string;
  @Field(() => [ChestMemberModelResolver], { nullable: true })
  members: {
    user_id: string;
  }[];
}
