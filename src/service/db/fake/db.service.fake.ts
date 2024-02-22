import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserFake } from '@service/db/fake/db.service.user.fake';
import { BddServiceTestFake } from '@service/db/fake/db.service.test.fake';
import { BddServiceChestFake } from '@src/service/db/fake/db.service.chest.fake';

class BddServiceFake {}

applyMixins(BddServiceFake, [
  BddServiceUserFake,
  BddServiceTestFake,
  BddServiceChestFake,
]);

export { BddServiceFake };
