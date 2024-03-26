import { applyMixins } from '@src/common/applyMixins';
import { BddServicePasskeyMongo } from '@src/service/db/mongo/db.service.passkey.mongo';
import { BddServiceUserMongo } from '@service/db/mongo/db.service.user.mongo';
import { BddServiceTestMongo } from '@service/db/mongo/db.service.test.mongo';
import { BddServiceThingMongo } from '@service/db/mongo/db.service.thing.mongo';
import { BddServiceChestMongo } from '@service/db/mongo/db.service.chest.mongo';

class BddServiceMongo {}

applyMixins(BddServiceMongo, [
  BddServiceUserMongo,
  BddServiceTestMongo,
  BddServiceChestMongo,
  BddServiceThingMongo,
  BddServicePasskeyMongo,
]);

export { BddServiceMongo };
