import { Db } from 'mongodb';
import * as mongoDB from 'mongodb';
import { config } from '@src/config';
import { logger } from '@src/common/logger/logger';
import { BddService } from '@service/db/db.service';
import { AuthUsecase } from '@usecase/auth/auth.usecase';
import { CryptService } from '@service/crypt/crypt.service';
import { GetUserUsecase } from '@usecase/user/get.user.usecase';
import { GetChestUsecase } from '@usecase/chest/get.chest.usecase';
import { PasswordService } from '@service/password/password.service';
import { CryptServiceReal } from '@service/crypt/crypt.service.real';
import { BddServiceMongo } from '@service/db/mongo/db.service.mongo';
import { CreateUserUsecase } from '@usecase/user/create.user.usecase';
import { BddServiceFake } from '@src/service/db/fake/db.service.fake';
import { GetAllUserUsecase } from '@usecase/user/get_all.user.usecase';
import { CreateChestUsecase } from '@usecase/chest/create.chest.usecase';
import { PasswordServiceReal } from '@service/password/password.service.real';
import { GetChestsForUserUsecase } from '@usecase/chest/getForUser.chest.usecase';

export class Inversify {
  mongo: Db;
  loggerService: any;
  bddService: BddService;
  authUsecase: AuthUsecase;
  cryptService: CryptService;
  getUserUsecase: GetUserUsecase;
  passwordService: PasswordService;
  getChestUsecase: GetChestUsecase;
  getAllUserUsecase: GetAllUserUsecase;
  createUserUsecase: CreateUserUsecase;
  createChestUsecase: CreateChestUsecase;
  getChestsForUserUsecase: GetChestsForUserUsecase;

  constructor() {
    /**
     * Services
     */
    this.cryptService = new CryptServiceReal();
    this.passwordService = new PasswordServiceReal();
    this.loggerService = logger;
    if (config.env.mode === 'prod') {
      this.initConnection();
      this.bddService = new BddServiceMongo() as BddService;
    } else if (config.env.mode === 'dev') {
      this.bddService = new BddServiceFake() as BddService;
    } else {
      this.bddService = new BddServiceFake() as BddService;
    }

    /**
     * Usecases
     */
    this.authUsecase = new AuthUsecase(this);
    this.getUserUsecase = new GetUserUsecase(this);
    this.getChestUsecase = new GetChestUsecase(this);
    this.createChestUsecase = new CreateChestUsecase(this);
    this.getAllUserUsecase = new GetAllUserUsecase(this);
    this.createUserUsecase = new CreateUserUsecase(this);
    this.getChestsForUserUsecase = new GetChestsForUserUsecase(this);
  }

  async initConnection() {
    const DB_CONN_STRING = 'mongodb://root:password@localhost:27017/';
    const DB_NAME = 'siguri';
    const clientMongo = new mongoDB.MongoClient(DB_CONN_STRING);
    await clientMongo.connect();
    this.mongo = clientMongo.db(DB_NAME);
    this.loggerService.log(
      'info',
      `Successfully connected to database: ${this.mongo.databaseName}`,
    );
  }
}

const inversify = new Inversify();

export default inversify;
