import { Db } from 'mongodb';
import { config } from '@src/config';
import { logger } from '@src/common/logger/logger';
import { BddService } from '@service/db/db.service';
import { AuthUsecase } from '@usecase/auth/auth.usecase';
import { CryptService } from '@service/crypt/crypt.service';
import { EncodeService } from '@service/encode/encode.service';
import { GetUserUsecase } from '@usecase/user/get.user.usecase';
import { BddServiceFake } from '@service/db/fake/db.service.fake';
import { GetChestUsecase } from '@usecase/chest/get.chest.usecase';
import { GetThingUsecase } from '@usecase/thing/get.thing.usecase';
import { JoinChestUsecase } from '@usecase/chest/join.chest.usecase';
import { PasswordService } from '@service/password/password.service';
import { CryptServiceReal } from '@service/crypt/crypt.service.real';
import { BddServiceMongo } from '@service/db/mongo/db.service.mongo';
import { CreateUserUsecase } from '@usecase/user/create.user.usecase';
import { LeaveChestUsecase } from '@usecase/chest/leave.chest.usecase';
import { GetAllUserUsecase } from '@usecase/user/get_all.user.usecase';
import { UpdPasswordUsecase } from '@usecase/auth/updPassword.usecase';
import { LoggerServiceFake } from '@service/logger/logger.service.fake';
import { EncodeServiceReal } from '@service/encode/encode.service.real';
import { AuthPasskeyUsecase } from '@usecase/auth/passkey.auth.usecase';
import { DeleteThingUsecase } from '@usecase/thing/delete.thing.usecase';
import { CreateChestUsecase } from '@usecase/chest/create.chest.usecase';
import { CreateThingUsecase } from '@usecase/thing/create.thing.usecase';
import { UpdateThingUsecase } from '@usecase/thing/update.thing.usecase';
import { UpdateChestUsecase } from '@usecase/chest/update.chest.usecase';
import { PasswordServiceReal } from '@service/password/password.service.real';
import { DeletePasskeyUsecase } from '@usecase/passkey/delete.passkey.usecase';
import { CreatePasskeyUsecase } from '@usecase/passkey/create.passkey.usecase';
import { IsAutorizedUsecase } from '@usecase/isAuthorized/isAuthorized.usecase';
import { PasswordLessService } from '@service/passwordless/passwordless.service';
import { GetChestsForUserUsecase } from '@usecase/chest/getForUser.chest.usecase';
import { GetThingsForChestUsecase } from '@usecase/thing/getForChest.thing.usecase';
import { GetByUserIdPasskeyUsecase } from '@usecase/passkey/getByUserId.passkey.usecase';
import { PasswordLessServiceFake } from '@service/passwordless/passwordless.service.fake';
import { PasswordLessServiceReal } from '@service/passwordless/passwordlless.service.real';

export class Inversify {
  mongo: Db;
  loggerService: any;
  bddService: BddService;
  authUsecase: AuthUsecase;
  cryptService: CryptService;
  encodeService: EncodeService;
  getUserUsecase: GetUserUsecase;
  getThingUsecase: GetThingUsecase;
  passwordService: PasswordService;
  getChestUsecase: GetChestUsecase;
  joinChestUsecase: JoinChestUsecase;
  leaveChestUsecase: LeaveChestUsecase;
  getAllUserUsecase: GetAllUserUsecase;
  createUserUsecase: CreateUserUsecase;
  updateChestUsecase: UpdateChestUsecase;
  deleteThingUsecase: DeleteThingUsecase;
  createChestUsecase: CreateChestUsecase;
  createThingUsecase: CreateThingUsecase;
  isAutorizedUsecase: IsAutorizedUsecase;
  updateThingUsecase: UpdateThingUsecase;
  updPasswordUsecase: UpdPasswordUsecase;
  authPasskeyUsecase: AuthPasskeyUsecase;
  passwordLessService: PasswordLessService;
  deletePasskeyUsecase: DeletePasskeyUsecase;
  createPasskeyUsecase: CreatePasskeyUsecase;
  getChestsForUserUsecase: GetChestsForUserUsecase;
  getThingsForChestUsecase: GetThingsForChestUsecase;
  getByUserIdPasskeyUsecase: GetByUserIdPasskeyUsecase;

  constructor() {
    /**
     * Services
     */
    this.cryptService = new CryptServiceReal();
    this.encodeService = new EncodeServiceReal();
    this.passwordService = new PasswordServiceReal();
    if (config.env.mode === 'prod') {
      this.loggerService = logger;
      this.bddService = new BddServiceMongo() as BddService;
      this.bddService.initConnection();
      this.passwordLessService = new PasswordLessServiceReal();
    } else if (config.env.mode === 'dev') {
      this.loggerService = new LoggerServiceFake();
      this.bddService = new BddServiceFake() as BddService;
      this.passwordLessService = new PasswordLessServiceReal();
    } else {
      this.loggerService = new LoggerServiceFake();
      this.bddService = new BddServiceFake() as BddService;
      this.passwordLessService = new PasswordLessServiceFake();
    }

    /**
     * Usecases
     */
    this.authUsecase = new AuthUsecase(this);
    this.getUserUsecase = new GetUserUsecase(this);
    this.getThingUsecase = new GetThingUsecase(this);
    this.getChestUsecase = new GetChestUsecase(this);
    this.joinChestUsecase = new JoinChestUsecase(this);
    this.leaveChestUsecase = new LeaveChestUsecase(this);
    this.getAllUserUsecase = new GetAllUserUsecase(this);
    this.createUserUsecase = new CreateUserUsecase(this);
    this.authPasskeyUsecase = new AuthPasskeyUsecase(this);
    this.updateChestUsecase = new UpdateChestUsecase(this);
    this.updPasswordUsecase = new UpdPasswordUsecase(this);
    this.createThingUsecase = new CreateThingUsecase(this);
    this.createChestUsecase = new CreateChestUsecase(this);
    this.deleteThingUsecase = new DeleteThingUsecase(this);
    this.updateThingUsecase = new UpdateThingUsecase(this);
    this.isAutorizedUsecase = new IsAutorizedUsecase(this);
    this.deletePasskeyUsecase = new DeletePasskeyUsecase(this);
    this.createPasskeyUsecase = new CreatePasskeyUsecase(this);
    this.getChestsForUserUsecase = new GetChestsForUserUsecase(this);
    this.getThingsForChestUsecase = new GetThingsForChestUsecase(this);
    this.getByUserIdPasskeyUsecase = new GetByUserIdPasskeyUsecase(this);
  }
}

const inversify = new Inversify();

export default inversify;
