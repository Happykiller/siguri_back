import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserFake } from '@service/db/fake/db.service.user.fake';
import { BddServiceTestFake } from '@service/db/fake/db.service.test.fake';
import { BddServiceBankFake } from '@service/db/fake/db.service.bank.fake';

class BddServiceFake {}

applyMixins(BddServiceFake, [
  BddServiceUserFake,
  BddServiceTestFake,
  BddServiceBankFake,
]);

export { BddServiceFake };
