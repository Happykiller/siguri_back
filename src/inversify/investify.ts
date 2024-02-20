import { config } from '@src/config';
import { BddService } from "@service/db/db.service";
import { BddServiceFake } from '@service/db/db.service.fake';
import { BddServiceMongo } from '@service/db/db.service.mongo';
import { CreateUserUsecase } from '@src/usecase/user/create.user.usecase';
import { GetAllUserUsecase } from '@src/usecase/user/get_all.user.usecase';

export class Inversify {
  bddService: BddService;
  getAllUserUsecase: GetAllUserUsecase;
  createUserUsecase: CreateUserUsecase;

  constructor() {
    /**
     * Services
     */
    if (config.env.mode === 'prod') {
      this.bddService = new BddServiceMongo();
    } else if (config.env.mode === 'dev') {
      this.bddService = new BddServiceMongo();
    } else {
      this.bddService = new BddServiceFake();
    }

    /**
     * Usecases
     */
    this.getAllUserUsecase = new GetAllUserUsecase(this);
    this.createUserUsecase = new CreateUserUsecase(this);
  }

}

const inversify = new Inversify();

export default inversify;