import { TYPE_THING } from '@src/common/TYPE_THING';
import { Inversify } from '@src/inversify/investify';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { ThingUsecaseModel } from '@usecase/thing/model/thing.usecase.model';
import { GetThingUsecaseDto } from '@usecase/thing/dto/get.thing.usecase.dto';
import { ERRORS } from '../../common/ERROR';

export class GetThingUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetThingUsecaseDto): Promise<ThingUsecaseModel> {
    const entity: ThingDbModel = await this.inversify.bddService.getThing(dto);

    if (!entity) {
      throw new Error(ERRORS.GET_THING_USECASE_THING_NOT_FOUND);
    }

    if (entity.type === TYPE_THING.CB) {
      entity.cb.number = this.inversify.encodeService.decode({
        message: entity.cb.number,
        secret: dto.chest_secret,
      });
      entity.cb.code = this.inversify.encodeService.decode({
        message: entity.cb.code,
        secret: dto.chest_secret,
      });
      entity.cb.crypto = this.inversify.encodeService.decode({
        message: entity.cb.crypto,
        secret: dto.chest_secret,
      });
    } else if (entity.type === TYPE_THING.CODE) {
      entity.code.code = this.inversify.encodeService.decode({
        message: entity.code.code,
        secret: dto.chest_secret,
      });
    } else if (entity.type === TYPE_THING.NOTE) {
      entity.note.note = this.inversify.encodeService.decode({
        message: entity.note.note,
        secret: dto.chest_secret,
      });
    } else if (entity.type === TYPE_THING.CREDENTIAL) {
      entity.credential.password = this.inversify.encodeService.decode({
        message: entity.credential.password,
        secret: dto.chest_secret,
      });
    }

    return entity;
  }
}
