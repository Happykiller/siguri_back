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
    const thing: ThingDbModel = await this.inversify.bddService.getThing(dto);

    if (!thing) {
      throw new Error(ERRORS.GET_THING_USECASE_THING_NOT_FOUND);
    }

    await this.inversify.isAutorizedUsecase.execute({
      user_id: dto.user_id,
      chest_id: thing.chest_id,
      chest_secret: dto.chest_secret,
    });

    if (thing.type === TYPE_THING.CB) {
      thing.cb.number = this.inversify.encodeService.decode({
        message: thing.cb.number,
        secret: dto.chest_secret,
      });
      thing.cb.code = this.inversify.encodeService.decode({
        message: thing.cb.code,
        secret: dto.chest_secret,
      });
      thing.cb.crypto = this.inversify.encodeService.decode({
        message: thing.cb.crypto,
        secret: dto.chest_secret,
      });
    } else if (thing.type === TYPE_THING.CODE) {
      thing.code.code = this.inversify.encodeService.decode({
        message: thing.code.code,
        secret: dto.chest_secret,
      });
    } else if (thing.type === TYPE_THING.NOTE) {
      thing.note.note = this.inversify.encodeService.decode({
        message: thing.note.note,
        secret: dto.chest_secret,
      });
    } else if (thing.type === TYPE_THING.CREDENTIAL) {
      thing.credential.password = this.inversify.encodeService.decode({
        message: thing.credential.password,
        secret: dto.chest_secret,
      });
    }

    return thing;
  }
}
