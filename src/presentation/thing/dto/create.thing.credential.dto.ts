import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateThingNoteResolverDto {
  @Field(() => String)
  note: string;
}
