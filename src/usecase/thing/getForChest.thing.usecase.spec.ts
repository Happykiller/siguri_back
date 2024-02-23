import { describe, expect, it } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import { BddService } from '@service/db/db.service';
import { Inversify } from '@src/inversify/investify';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { EncodeService } from '@service/encode/encode.service';
import { thingChestRopo } from '@service/db/fake/mock/thing.chest.repo';
import { GetThingsForChestUsecase } from '@usecase/thing/getForChest.thing.usecase';

describe('GetThingsForChestUsecase', () => {
  const mockInversify: MockProxy<Inversify> = mock<Inversify>();
  const mockBddService: MockProxy<BddService> = mock<BddService>();
  const mockEncodeService: MockProxy<EncodeService> = mock<EncodeService>();

  mockInversify.bddService = mockBddService;
  mockInversify.encodeService = mockEncodeService;

  const usecase: GetThingsForChestUsecase = new GetThingsForChestUsecase(
    mockInversify,
  );

  describe('#execute', () => {
    it('should build', () => {
      // arrange
      // act
      // assert
      expect(usecase).toBeDefined();
    });

    it('should get a thing', async () => {
      // arrange
      mockBddService.getForChestThings.mockResolvedValue([thingChestRopo]);
      mockEncodeService.decode.mockImplementation((dto) => dto.message);
      // act
      const response = await usecase.execute({
        chest_id: thingChestRopo.chest_id,
        user_id: userRopo.id,
        chest_secret: 'password',
      });
      // assert
      expect(response).toEqual([thingChestRopo]);
    });
  });
});
