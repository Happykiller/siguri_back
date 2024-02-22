import { BddService } from '@service/db/db.service';

export class BddServiceTestMongo implements Pick<BddService, 'test'> {
  async test(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
