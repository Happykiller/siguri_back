import { ERRORS } from '@src/common/ERROR';
import { TYPE_THING } from '@src/common/TYPE_THING';
import { Inversify } from '@src/inversify/investify';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { ThingUsecaseModel } from '@usecase/thing/model/thing.usecase.model';
import { UpdateThingUsecaseDto } from '@usecase/thing/dto/update.thing.usecase.dto';

export class UpdateThingUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: UpdateThingUsecaseDto): Promise<ThingUsecaseModel> {
    let thing: ThingDbModel = await this.inversify.bddService.getThing(dto);

    if (!thing) {
      throw new Error(ERRORS.GET_THING_USECASE_THING_NOT_FOUND);
    }

    await this.inversify.isAutorizedUsecase.execute({
      user_id: dto.user_id,
      chest_id: thing.chest_id,
      chest_secret: dto.chest_secret,
    });

    const chest_secret = dto.chest_secret;
    delete dto.chest_secret;

    if (thing.type === TYPE_THING.CB) {
      if (dto.cb?.number) {
        dto.cb.number = this.inversify.encodeService.encode({
          message: dto.cb.number,
          secret: chest_secret,
        });
      }
      if (dto.cb?.code) {
        dto.cb.code = this.inversify.encodeService.encode({
          message: dto.cb.code,
          secret: chest_secret,
        });
      }
      if (dto.cb?.crypto) {
        dto.cb.crypto = this.inversify.encodeService.encode({
          message: dto.cb.crypto,
          secret: chest_secret,
        });
      }
    } else if (thing.type === TYPE_THING.CODE && dto.code?.code) {
      dto.code.code = this.inversify.encodeService.encode({
        message: dto.code.code,
        secret: chest_secret,
      });
    } else if (thing.type === TYPE_THING.NOTE && dto.note?.note) {
      dto.note.note = this.inversify.encodeService.encode({
        message: dto.note.note,
        secret: chest_secret,
      });
    } else if (thing.type === TYPE_THING.CREDENTIAL && dto.credential?.password) {
      dto.credential.password = this.inversify.encodeService.encode({
        message: dto.credential.password,
        secret: chest_secret,
      });
    }

    thing = await this.inversify.bddService.updateThing(dto);

    if (thing.type === TYPE_THING.CB) {
      thing.cb.number = this.inversify.encodeService.decode({
        message: thing.cb.number,
        secret: chest_secret,
      });
      thing.cb.code = this.inversify.encodeService.decode({
        message: thing.cb.code,
        secret: chest_secret,
      });
      thing.cb.crypto = this.inversify.encodeService.decode({
        message: thing.cb.crypto,
        secret: chest_secret,
      });
    } else if (thing.type === TYPE_THING.CODE) {
      thing.code.code = this.inversify.encodeService.decode({
        message: thing.code.code,
        secret: chest_secret,
      });
    } else if (thing.type === TYPE_THING.NOTE) {
      thing.note.note = this.inversify.encodeService.decode({
        message: thing.note.note,
        secret: chest_secret,
      });
    } else if (thing.type === TYPE_THING.CREDENTIAL) {
      thing.credential.password = this.inversify.encodeService.decode({
        message: thing.credential.password,
        secret: chest_secret,
      });
    }

    return thing;
  }
}
