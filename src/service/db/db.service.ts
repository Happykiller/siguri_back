import { UserDbModel } from '@service/db/model/user.db.model';
import { GetUserDbDto } from '@service/db/dto/get.user.db.dto';
import { ChestDbModel } from '@service/db/model/chest.db.model';
import { ThingDbModel } from '@service/db/model/thing.db.model';
import { GetChestDbDto } from '@service/db/dto/get.chest.db.dto';
import { GetThingDbDto } from '@service/db/dto/get.thing.db.dto';
import { CreateUserDbDto } from '@service/db/dto/create.user.db.dto';
import { CreateChestDbDto } from '@service/db/dto/create.chest.db.dto';
import { CreateThingDbDto } from '@service/db/dto/create.thing.db.dto';
import { GetChestsForUserDbDto } from '@service/db/dto/getForUser.chest.db.dto';
import { GetForChestThingsDbDto } from '@service/db/dto/getForChest.thing.db.dto';

export interface BddService {
  test(): Promise<boolean>;
  initConnection(): Promise<void>;
  /**
   * User
   */
  getAllUser(): Promise<UserDbModel[]>;
  getUser(dto: GetUserDbDto): Promise<UserDbModel>;
  createUser(dto: CreateUserDbDto): Promise<UserDbModel>;
  /**
   * Chest
   */
  createChest(dto: CreateChestDbDto): Promise<ChestDbModel>;
  getChest(dto: GetChestDbDto): Promise<ChestDbModel>;
  getChestsForUser(dto: GetChestsForUserDbDto): Promise<ChestDbModel[]>;
  /**
   * Thing
   */
  createThing(dto: CreateThingDbDto): Promise<ThingDbModel>;
  getThing(dto: GetThingDbDto): Promise<ThingDbModel>;
  getForChestThings(dto: GetForChestThingsDbDto): Promise<ThingDbModel[]>;
}
