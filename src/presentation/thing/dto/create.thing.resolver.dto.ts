import { Field, InputType } from '@nestjs/graphql';
import { CreateThingCbResolverDto } from '@presentation/thing/dto/create.thing.cb.resolver.dto';
import { CreateThingNoteResolverDto } from '@presentation/thing/dto/create.thing.credential.dto';
import { CreateThingCodeResolverDto } from '@presentation/thing/dto/create.thing.code.resolver.dto';
import { CreateThingTotpResolverDto } from '@presentation/thing/dto/create.thing.totp.resolver.dto';
import { CreateThingCredentialResolverDto } from '@presentation/thing/dto/create.thing.note.resolver.dto';

@InputType()
export class CreateThingResolverDto {
  @Field(() => String)
  label: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String)
  chest_id: string;
  @Field(() => String)
  chest_secret: string;
  @Field(() => String)
  type: string;
  @Field(() => CreateThingCbResolverDto, { nullable: true })
  cb: CreateThingCbResolverDto;
  @Field(() => CreateThingCodeResolverDto, { nullable: true })
  code: CreateThingCodeResolverDto;
  @Field(() => CreateThingNoteResolverDto, { nullable: true })
  note: CreateThingNoteResolverDto;
  @Field(() => CreateThingCredentialResolverDto, { nullable: true })
  credential: CreateThingCredentialResolverDto;
  @Field(() => CreateThingTotpResolverDto, { nullable: true })
  totp: CreateThingTotpResolverDto;
}
