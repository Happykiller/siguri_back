import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { chestRopo } from '@src/service/db/fake/mock/chest.ropo';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { GetChestsForUserUsecase } from '@usecase/chest/getForUser.chest.usecase';

describe('GetChestsForUserUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();

  mockInversify.bddService = mockBddService;

  const usecase: GetChestsForUserUsecase = new GetChestsForUserUsecase(
    mockInversify,
  );

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get chests', async () => {
      // arrange
      mockBddService.getChestsForUser.mockResolvedValue([chestRopo]);
      // act
      const response = await usecase.execute({
        user_id: userRopo.id,
      });
      // assert
      expect(response).toEqual([chestRopo]);
    });
  });
});
