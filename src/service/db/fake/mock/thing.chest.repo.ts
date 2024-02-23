import { ThingDbModel } from '@service/db/model/thing.db.model';
import { TYPE_THING } from '../../../../common/TYPE_THING';
import { userRopo } from './user.ropo';
import { chestRopo } from './chest.ropo';

export const thingChestRopo: ThingDbModel = {
  id: '65d4d015261e894a1da31a63',
  label: 'label',
  description: 'description',
  type: TYPE_THING.CREDENTIAL,
  credential: {
    id: 'login',
    password: 'password',
    address: 'http://localhost/',
  },
  author_id: userRopo.id,
  chest_id: chestRopo.id,
  active: true,
};
