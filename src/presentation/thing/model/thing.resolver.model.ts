import { Field, ObjectType } from '@nestjs/graphql';
import { ThingCbResolverModel } from '@presentation/thing/model/thing.cb.resolver.model';
import { ThingTotpResolverModel } from '@presentation/thing/model/thing.totp.resolver.model';
import { ThingNoteResolverModel } from '@presentation/thing/model/thing.note.resolver.model';
import { ThingCodeResolverModel } from '@presentation/thing/model/thing.code.resolver.model';
import { ThingCredentialResolverModel } from '@presentation/thing/model/thing.credential.resolver.model';

@ObjectType()
export class ThingModelResolver {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  label: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  author_id: string;
  @Field(() => String, { nullable: true })
  chest_id: string;
  @Field(() => String, { nullable: true })
  type: string;
  @Field(() => ThingCbResolverModel, { nullable: true })
  cb?: ThingCbResolverModel;
  @Field(() => ThingCodeResolverModel, { nullable: true })
  code?: ThingCodeResolverModel;
  @Field(() => ThingCredentialResolverModel, { nullable: true })
  credential?: ThingCredentialResolverModel;
  @Field(() => ThingNoteResolverModel, { nullable: true })
  note?: ThingNoteResolverModel;
  @Field(() => ThingTotpResolverModel, { nullable: true })
  totp?: ThingTotpResolverModel;
}
