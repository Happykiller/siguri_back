import { TYPE_THING } from '@src/common/TYPE_THING';
import { Inversify } from '@src/inversify/investify';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { ThingUsecaseModel } from '@usecase/thing/model/thing.usecase.model';
import { CreateThingUsecaseDto } from '@usecase/thing/dto/create.thing.usecase.dto';

export class CreateThingUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateThingUsecaseDto): Promise<ThingUsecaseModel> {
    const chest_secret = dto.chest_secret;
    delete dto.chest_secret;

    if (dto.type === TYPE_THING.CB) {
      dto.cb.number = this.inversify.encodeService.encode({
        message: dto.cb.number,
        secret: chest_secret,
      });
      dto.cb.code = this.inversify.encodeService.encode({
        message: dto.cb.code,
        secret: chest_secret,
      });
      dto.cb.crypto = this.inversify.encodeService.encode({
        message: dto.cb.crypto,
        secret: chest_secret,
      });
    } else if (dto.type === TYPE_THING.CODE) {
      dto.code.code = this.inversify.encodeService.encode({
        message: dto.code.code,
        secret: chest_secret,
      });
    } else if (dto.type === TYPE_THING.NOTE) {
      dto.note.note = this.inversify.encodeService.encode({
        message: dto.note.note,
        secret: chest_secret,
      });
    } else if (dto.type === TYPE_THING.CREDENTIAL) {
      dto.credential.password = this.inversify.encodeService.encode({
        message: dto.credential.password,
        secret: chest_secret,
      });
    }

    let entity: ThingDbModel =
      await this.inversify.bddService.createThing(dto);

    if (dto.type === TYPE_THING.CB) {
      entity.cb.number = this.inversify.encodeService.decode({
        message: entity.cb.number,
        secret: chest_secret,
      });
      entity.cb.code = this.inversify.encodeService.decode({
        message: entity.cb.code,
        secret: chest_secret,
      });
      entity.cb.crypto = this.inversify.encodeService.decode({
        message: entity.cb.crypto,
        secret: chest_secret,
      });
    } else if (dto.type === TYPE_THING.CODE) {
      entity.code.code = this.inversify.encodeService.decode({
        message: entity.code.code,
        secret: chest_secret,
      });
    } else if (dto.type === TYPE_THING.NOTE) {
      entity.note.note = this.inversify.encodeService.decode({
        message: entity.note.note,
        secret: chest_secret,
      });
    } else if (dto.type === TYPE_THING.CREDENTIAL) {
      entity.credential.password = this.inversify.encodeService.decode({
        message: entity.credential.password,
        secret: chest_secret,
      });
    }

    return entity;
  }
}
