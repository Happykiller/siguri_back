import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChestMemberModelResolver {
  @Field(() => String, { nullable: true })
  user_id: string;
}
