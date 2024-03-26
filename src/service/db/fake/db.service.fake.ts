import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserFake } from '@service/db/fake/db.service.user.fake';
import { BddServiceTestFake } from '@service/db/fake/db.service.test.fake';
import { BddServiceChestFake } from '@service/db/fake/db.service.chest.fake';
import { BddServiceThingFake } from '@service/db/fake/db.service.thing.fake';
import { BddServicePasskeyFake } from '@service/db/fake/db.service.passkey.fake';

class BddServiceFake {}

applyMixins(BddServiceFake, [
  BddServiceUserFake,
  BddServiceTestFake,
  BddServiceChestFake,
  BddServiceThingFake,
  BddServicePasskeyFake,
]);

export { BddServiceFake };
