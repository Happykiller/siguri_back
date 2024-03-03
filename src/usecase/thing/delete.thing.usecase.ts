import { ERRORS } from '@src/common/ERROR';
import { Inversify } from '@src/inversify/investify';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { DeleteThingUsecaseDto } from '@usecase/thing/dto/delete.thing.usecase.dto';

export class DeleteThingUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: DeleteThingUsecaseDto): Promise<boolean> {
    let thing: ThingDbModel = await this.inversify.bddService.getThing(dto);

    if (!thing) {
      throw new Error(ERRORS.GET_THING_USECASE_THING_NOT_FOUND);
    }

    await this.inversify.isAutorizedUsecase.execute({
      user_id: dto.user_id,
      chest_id: thing.chest_id,
      chest_secret: dto.chest_secret,
    });

  
    const response:boolean = await this.inversify.bddService.deleteThing(dto);
    
    return response;
  }
}
