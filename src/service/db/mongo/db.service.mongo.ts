import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserMongo } from '@service/db/mongo/db.service.user.mongo';
import { BddServiceTestMongo } from '@service/db/mongo/db.service.test.mongo';
import { BddServiceChestMongo } from '@src/service/db/mongo/db.service.chest.mongo';

class BddServiceMongo {}

applyMixins(BddServiceMongo, [
  BddServiceUserMongo,
  BddServiceTestMongo,
  BddServiceChestMongo,
]);

export { BddServiceMongo };
