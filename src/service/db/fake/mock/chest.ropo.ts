import { userRopo } from '@service/db/fake/mock/user.ropo';
import { ChestDbModel } from '@src/service/db/model/chest.db.model';

export const chestRopo: ChestDbModel = {
  id: '65d4d015261e894a1da31a65',
  label: `ropo's chest`,
  secret:
    '/FsJjfd4JDRxSAUQ/gPeESMU+1MXmQuYrVLIYbCgvaJ4OUJ0Qx8OStxsbVVdX9eRLRm2++iYA6Q+FVwB4yjVJg==',
  description: 'secret for secret',
  author_id: userRopo.id,
  members: [
    {
      user_id: userRopo.id,
    },
  ],
  active: true,
};
