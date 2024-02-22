import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { bankRopo } from '@service/db/fake/mock/bank.ropo';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { GetBanksForUserUsecase } from '@usecase/bank/getForUser.bank.usecase';

describe('GetBanksForUserUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();

  mockInversify.bddService = mockBddService;

  const usecase: GetBanksForUserUsecase = new GetBanksForUserUsecase(
    mockInversify,
  );

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get banks', async () => {
      // arrange
      mockBddService.getBanksForUser.mockResolvedValue([bankRopo]);
      // act
      const response = await usecase.execute({
        user_id: userRopo.id,
      });
      // assert
      expect(response).toEqual([bankRopo]);
    });
  });
});
