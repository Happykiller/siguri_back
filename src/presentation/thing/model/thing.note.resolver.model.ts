import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ThingNoteResolverModel {
  @Field(() => String)
  note: string;
}
