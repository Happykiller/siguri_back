import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserMongo } from '@service/db/mongo/db.service.user.mongo';
import { BddServiceTestMongo } from '@service/db/mongo/db.service.test.mongo';
import { BddServiceBankMongo } from '@service/db/mongo/db.service.bank.mongo';

class BddServiceMongo {}

applyMixins(BddServiceMongo, [
  BddServiceUserMongo,
  BddServiceTestMongo,
  BddServiceBankMongo,
]);

export { BddServiceMongo };
