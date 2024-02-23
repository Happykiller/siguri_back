import { TYPE_THING } from '@src/common/TYPE_THING';
import { Inversify } from '@src/inversify/investify';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { ThingUsecaseModel } from '@usecase/thing/model/thing.usecase.model';
import { GetForChestThingUsecaseDto } from '@usecase/thing/dto/getForChest.thing.usecase.dto';

export class GetThingsForChestUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetForChestThingUsecaseDto): Promise<ThingUsecaseModel[]> {
    const entities: ThingDbModel[] =
      await this.inversify.bddService.getForChestThings(dto);

    for (const entity of entities) {
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
    }

    return entities;
  }
}
