import { ThingDbModel } from '@service/db/model/thing.db.model';
import { TYPE_THING } from '../../../../common/TYPE_THING';
import { userRopo } from './user.ropo';
import { chestRopo } from './chest.ropo';

export const thingChestRopo: ThingDbModel = {
  id: '65d4d015261e894a1da31a63',
  label: 'label',
  description: 'password with secret',
  type: TYPE_THING.CREDENTIAL,
  credential: {
    id: 'login',
    password: 'U2FsdGVkX19E8qcYLb8ZSbgM4/uKUFKxoLdGTp14HZE=',
    address: 'http://localhost/',
  },
  author_id: userRopo.id,
  chest_id: chestRopo.id,
  active: true,
};
