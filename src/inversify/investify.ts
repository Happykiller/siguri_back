import { config } from '@src/config';
import { logger } from '@src/common/logger/logger';
import { BddService } from '@service/db/db.service';
import { CryptService } from '@service/crypt/crypt.service';
import { BddServiceFake } from '@service/db/db.service.fake';
import { BddServiceMongo } from '@service/db/db.service.mongo';
import { CryptServiceReal } from '@service/crypt/crypt.service.real';
import { CreateUserUsecase } from '@usecase/user/create.user.usecase';
import { GetAllUserUsecase } from '@usecase/user/get_all.user.usecase';

export class Inversify {
  loggerService: any;
  bddService: BddService;
  cryptService: CryptService;
  getAllUserUsecase: GetAllUserUsecase;
  createUserUsecase: CreateUserUsecase;

  constructor() {
    /**
     * Services
     */
    this.cryptService = new CryptServiceReal();
    this.loggerService = logger;
    if (config.env.mode === 'prod') {
      this.bddService = new BddServiceMongo(this);
    } else if (config.env.mode === 'dev') {
      this.bddService = new BddServiceFake();
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
